import express from 'express';
import mongoose from 'mongoose';
import Profile from '../models/profile.model.js';
import User from '../models/user.model.js';
import Job from '../models/job.model.js';
import Application from '../models/application.model.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/talents', verifyToken, async (req, res) => {
    try {
        const { 
            search,           // talent name search
            jobTitle,         // job title (from headline)
            location, 
            skills, 
            salaryMin, 
            salaryMax,
            sortBy,
            page = 1, 
            limit = 20 
        } = req.query;
        
        const query = { isPublic: true };

        // Job title filter (headline)
        if (jobTitle) {
            query.headline = { $regex: jobTitle, $options: 'i' };
        }

        // Location filter
        if (location) {
            query.$or = [
                { 'location.city': { $regex: location, $options: 'i' } },
                { 'location.country': { $regex: location, $options: 'i' } }
            ];
        }

        // Skills filter
        if (skills) {
            const skillArray = skills.split(',').map(s => s.trim());
            query.skills = { $in: skillArray };
        }

        // Salary range filter
        if (salaryMin || salaryMax) {
            query.expectedSalary = {};
            
            if (salaryMin) {
                query.expectedSalary.min = { $gte: parseInt(salaryMin) };
            }
            if (salaryMax) {
                query.expectedSalary.max = { $lte: parseInt(salaryMax) };
            }
        }

        const skip = (page - 1) * limit;
        
        // Build sort options
        let sortOptions = { createdAt: -1 };
        if (sortBy === 'relevance') {
            sortOptions = { createdAt: -1 };
        } else if (sortBy === 'salary') {
            sortOptions = { 'expectedSalary.max': -1 };
        } else if (sortBy === 'experience') {
            sortOptions = { 'experience.length': -1 };
        }

        const profiles = await Profile.find(query)
            .populate('userId', 'username email avatar')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Profile.countDocuments(query);

        console.log('Talents query:', query);
        console.log('Found profiles:', total);

        res.status(200).json({
            profiles,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching talents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/companies', async (req, res) => {
    try {
        const companies = await Job.distinct('company.name');
        res.status(200).json({ companies });
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/recommended', async (req, res) => {
    try {
        const { exclude, limit = 5 } = req.query;
        
        const query = { isPublic: true };
        
        // Exclude the current profile
        if (exclude) {
            query._id = { $ne: exclude };
        }

        const profiles = await Profile.find(query)
            .populate('userId', 'username email avatar')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));

        res.status(200).json({ profiles });
    } catch (error) {
        console.error('Error fetching recommended talents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/company/:name', async (req, res) => {
    try {
        const companyName = req.params.name;
        const jobs = await Job.find({ 'company.name': companyName, status: 'active' })
            .populate('recruiterId', 'username email')
            .sort({ createdAt: -1 })
            .limit(10);
        
        if (jobs.length === 0) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const companyData = {
            name: jobs[0].company.name,
            logo: jobs[0].company.logo,
            website: jobs[0].company.website,
            description: jobs[0].company.description,
            industry: 'Technology',
            size: '1000+',
            headquarters: jobs[0].location,
            specialties: jobs.flatMap((job) => job.skills || []).slice(0, 10)
        };

        res.status(200).json({ company: companyData, jobs });
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/applications', verifyToken, async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = { candidateId: req.user.id };

        if (status) {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const applications = await Application.find(query)
            .populate('jobId')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Application.countDocuments(query);

        res.status(200).json({
            applications,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/me', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await Profile.findOne({ userId }).populate('userId', 'username email avatar');
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ profile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        let profile;
        
        // Check if it's a valid ObjectId first
        if (mongoose.Types.ObjectId.isValid(userId)) {
            // Try to find by profile _id first
            profile = await Profile.findById(userId).populate('userId', 'username email avatar');
            
            // If not found by profile ID, try by userId (foreign key)
            if (!profile) {
                profile = await Profile.findOne({ userId }).populate('userId', 'username email avatar');
            }
        } else {
            // If not valid ObjectId, try username search
            const user = await User.findOne({ username: userId });
            if (user) {
                profile = await Profile.findOne({ userId: user._id }).populate('userId', 'username email avatar');
            }
        }
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ profile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/me', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        let profile = await Profile.findOne({ userId });
        
        if (!profile) {
            profile = new Profile({ userId });
        }

        const allowedUpdates = [
            'headline', 'summary', 'location', 'phone', 'website', 'portfolio',
            'linkedin', 'github', 'coverImage', 'skills', 'yearsOfExperience',
            'currentCompany', 'currentRole', 'expectedSalary', 'availability',
            'preferredJobType', 'experience', 'education', 'projects',
            'certifications', 'languages', 'resume', 'isPublic'
        ];
        
        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                profile[field] = req.body[field];
            }
        });

        await profile.save();
        res.status(200).json({ profile });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Experience CRUD
router.post('/experience', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const newExperience = {
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        };

        profile.experience.push(newExperience);
        await profile.save();

        res.status(201).json({ message: 'Experience added', experience: newExperience });
    } catch (error) {
        console.error('Error adding experience:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/experience/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const experienceIndex = profile.experience.findIndex(e => e._id.toString() === id);
        if (experienceIndex === -1) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        Object.assign(profile.experience[experienceIndex], req.body);
        await profile.save();

        res.status(200).json({ message: 'Experience updated', experience: profile.experience[experienceIndex] });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/experience/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.experience = profile.experience.filter(e => e._id.toString() !== id);
        await profile.save();

        res.status(200).json({ message: 'Experience deleted' });
    } catch (error) {
        console.error('Error deleting experience:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Education CRUD
router.post('/education', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const newEducation = {
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        };

        profile.education.push(newEducation);
        await profile.save();

        res.status(201).json({ message: 'Education added', education: newEducation });
    } catch (error) {
        console.error('Error adding education:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/education/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const educationIndex = profile.education.findIndex(e => e._id.toString() === id);
        if (educationIndex === -1) {
            return res.status(404).json({ message: 'Education not found' });
        }

        Object.assign(profile.education[educationIndex], req.body);
        await profile.save();

        res.status(200).json({ message: 'Education updated', education: profile.education[educationIndex] });
    } catch (error) {
        console.error('Error updating education:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/education/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.education = profile.education.filter(e => e._id.toString() !== id);
        await profile.save();

        res.status(200).json({ message: 'Education deleted' });
    } catch (error) {
        console.error('Error deleting education:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Projects CRUD
router.post('/projects', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const newProject = {
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        };

        profile.projects.push(newProject);
        await profile.save();

        res.status(201).json({ message: 'Project added', project: newProject });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/projects/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const projectIndex = profile.projects.findIndex(p => p._id.toString() === id);
        if (projectIndex === -1) {
            return res.status(404).json({ message: 'Project not found' });
        }

        Object.assign(profile.projects[projectIndex], req.body);
        await profile.save();

        res.status(200).json({ message: 'Project updated', project: profile.projects[projectIndex] });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/projects/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.projects = profile.projects.filter(p => p._id.toString() !== id);
        await profile.save();

        res.status(200).json({ message: 'Project deleted' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Certifications CRUD
router.post('/certifications', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const newCertification = {
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        };

        profile.certifications.push(newCertification);
        await profile.save();

        res.status(201).json({ message: 'Certification added', certification: newCertification });
    } catch (error) {
        console.error('Error adding certification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/certifications/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const certIndex = profile.certifications.findIndex(c => c._id.toString() === id);
        if (certIndex === -1) {
            return res.status(404).json({ message: 'Certification not found' });
        }

        Object.assign(profile.certifications[certIndex], req.body);
        await profile.save();

        res.status(200).json({ message: 'Certification updated', certification: profile.certifications[certIndex] });
    } catch (error) {
        console.error('Error updating certification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/certifications/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.certifications = profile.certifications.filter(c => c._id.toString() !== id);
        await profile.save();

        res.status(200).json({ message: 'Certification deleted' });
    } catch (error) {
        console.error('Error deleting certification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Skills management
router.put('/skills', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { skills } = req.body;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.skills = skills;
        await profile.save();

        res.status(200).json({ message: 'Skills updated', skills: profile.skills });
    } catch (error) {
        console.error('Error updating skills:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Visibility toggle
router.put('/visibility', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { isPublic } = req.body;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.isPublic = isPublic;
        await profile.save();

        res.status(200).json({ message: 'Profile visibility updated', isPublic: profile.isPublic });
    } catch (error) {
        console.error('Error updating visibility:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Resume upload
router.post('/resume', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { url, fileName } = req.body;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.resume = {
            url,
            fileName,
            uploadedAt: new Date()
        };
        await profile.save();

        res.status(200).json({ message: 'Resume uploaded', resume: profile.resume });
    } catch (error) {
        console.error('Error uploading resume:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/resume', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.resume = undefined;
        await profile.save();

        res.status(200).json({ message: 'Resume deleted' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
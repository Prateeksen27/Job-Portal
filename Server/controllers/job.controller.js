import Job from '../models/job.model.js';
import Application from '../models/application.model.js';
import { validationResult } from 'express-validator';

export const createJob = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, requirements, responsibilities, location, jobType, experience, salary, skills, company, deadline } = req.body;

        const job = new Job({
            title,
            description,
            requirements,
            responsibilities,
            location,
            jobType,
            experience,
            salary,
            skills,
            company,
            recruiterId: req.user.id,
            status: 'open',
            deadline
        });

        await job.save();

        res.status(201).json({
            message: 'Job created successfully',
            job
        });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getJobs = async (req, res) => {
    try {
        const { 
            search, 
            location, 
            skills, 
            minSalary, 
            maxSalary, 
            experience, 
            jobType,
            page = 1,
            limit = 20
        } = req.query;

        const query = { status: 'open' };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { skills: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        if (skills) {
            const skillArray = skills.split(',').map(s => s.trim());
            query.skills = { $in: skillArray };
        }

        if (minSalary || maxSalary) {
            query['salary.min'] = { $gte: minSalary || 0 };
            if (maxSalary) {
                query['salary.max'] = { $lte: maxSalary };
            }
        }

        if (experience) {
            query.experience = experience;
        }

        if (jobType) {
            query.jobType = jobType;
        }

        const skip = (page - 1) * limit;

        const jobs = await Job.find(query)
            .populate('recruiterId', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Job.countDocuments(query);

        res.status(200).json({
            jobs,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('recruiterId', 'username email avatar company');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ job });
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.recruiterId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this job' });
        }

        const allowedUpdates = ['title', 'description', 'requirements', 'responsibilities', 'location', 'jobType', 'experience', 'salary', 'skills', 'company', 'status', 'deadline'];

        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                job[field] = req.body[field];
            }
        });

        await job.save();

        res.status(200).json({
            message: 'Job updated successfully',
            job
        });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.recruiterId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this job' });
        }

        job.status = 'closed';
        await job.save();

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMyJobs = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;

        const jobs = await Job.find({ recruiterId: req.user.id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Job.countDocuments({ recruiterId: req.user.id });

        res.status(200).json({
            jobs,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching my jobs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getJobApplicants = async (req, res) => {
    try {
        const { id: jobId } = req.params;
        const { page = 1, limit = 20 } = req.query;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.recruiterId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view applicants for this job' });
        }

        const skip = (page - 1) * limit;

        const applications = await Application.find({ jobId })
            .populate({
                path: 'candidateId',
                select: 'username email avatar'
            })
            .populate({
                path: 'jobId',
                select: 'title'
            })
            .sort({ appliedAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Application.countDocuments({ jobId });

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
        console.error('Error fetching job applicants:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
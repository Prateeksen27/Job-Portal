import Application from '../models/application.model.js';
import Job from '../models/job.model.js';
import { validationResult } from 'express-validator';

export const applyJob = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { jobId, coverLetter, resume } = req.body;
        const candidateId = req.user.id;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.status !== 'open') {
            return res.status(400).json({ message: 'Job is not accepting applications' });
        }

        const existingApplication = await Application.findOne({ jobId, candidateId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const application = new Application({
            jobId,
            candidateId,
            coverLetter,
            resume,
            status: 'APPLIED',
            timeline: [{
                status: 'APPLIED',
                updatedAt: new Date(),
                note: 'Application submitted'
            }]
        });

        await application.save();

        res.status(201).json({
            message: 'Application submitted successfully',
            application
        });
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserApplications = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = { candidateId: req.user.id };

        if (status) {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const applications = await Application.find(query)
            .populate({
                path: 'jobId',
                populate: {
                    path: 'recruiterId',
                    select: 'username email company'
                }
            })
            .sort({ appliedAt: -1 })
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
        console.error('Error fetching user applications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getJobApplications = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { status, page = 1, limit = 20 } = req.query;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.recruiterId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view applications for this job' });
        }

        const query = { jobId };
        if (status) {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const applications = await Application.find(query)
            .populate('candidateId', 'username email avatar profile')
            .sort({ appliedAt: -1 })
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
        console.error('Error fetching job applications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { status, note } = req.body;

        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        const job = await Job.findById(application.jobId);
        if (!job || job.recruiterId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this application' });
        }

        application.status = status;
        application.timeline.push({
            status,
            updatedAt: new Date(),
            note: note || `Status changed to ${status}`
        });

        await application.save();

        res.status(200).json({
            message: 'Application status updated successfully',
            application
        });
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('jobId')
            .populate('candidateId', 'username email avatar profile');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (application.candidateId._id.toString() !== req.user.id) {
            const job = await Job.findById(application.jobId);
            if (!job || job.recruiterId.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized to view this application' });
            }
        }

        res.status(200).json({ application });
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
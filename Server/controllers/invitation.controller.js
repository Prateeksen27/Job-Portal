import Invitation from '../models/invitation.model.js';
import Job from '../models/job.model.js';
import User from '../models/user.model.js';
import Application from '../models/application.model.js';
import { validationResult } from 'express-validator';

export const sendInvitation = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { candidateId, jobId, message } = req.body;
        const recruiterId = req.user.id;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.recruiterId.toString() !== recruiterId) {
            return res.status(403).json({ message: 'Not authorized to send invitations for this job' });
        }

        const candidate = await User.findById(candidateId);
        if (!candidate || candidate.role !== 'JOB_SEEKER') {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const existingInvitation = await Invitation.findOne({
            recruiterId,
            candidateId,
            jobId,
            status: { $in: ['pending', 'accepted'] }
        });

        if (existingInvitation) {
            return res.status(400).json({ message: 'Invitation already sent to this candidate for this job' });
        }

        const invitation = new Invitation({
            recruiterId,
            candidateId,
            jobId,
            message,
            status: 'pending',
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        await invitation.save();

        res.status(201).json({
            message: 'Invitation sent successfully',
            invitation
        });
    } catch (error) {
        console.error('Error sending invitation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserInvitations = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = { candidateId: req.user.id };

        if (status) {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const invitations = await Invitation.find(query)
            .populate({
                path: 'jobId',
                select: 'title location jobType salary'
            })
            .populate({
                path: 'recruiterId',
                select: 'username email company'
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Invitation.countDocuments(query);

        res.status(200).json({
            invitations,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching user invitations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getRecruiterInvitations = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = { recruiterId: req.user.id };

        if (status) {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const invitations = await Invitation.find(query)
            .populate({
                path: 'jobId',
                select: 'title location'
            })
            .populate({
                path: 'candidateId',
                select: 'username email avatar profile'
            })
            .sort({ createdAt: -1})
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Invitation.countDocuments(query);

        res.status(200).json({
            invitations,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching recruiter invitations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const acceptInvitation = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Accept invitation ID:', id);
        console.log('User ID:', req.user.id);
        
        const invitation = await Invitation.findById(id);

        if (!invitation) {
            console.log('Invitation not found for ID:', id);
            return res.status(404).json({ message: 'Invitation not found' });
        }

        console.log('Invitation candidateId:', invitation.candidateId.toString());
        console.log('Invitation status:', invitation.status);
        console.log('Invitation expiresAt:', invitation.expiresAt);
        console.log('Current date:', new Date());
        console.log('Is expired:', new Date() > invitation.expiresAt);

        if (invitation.candidateId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to accept this invitation' });
        }

        if (invitation.status !== 'pending') {
            return res.status(400).json({ message: `Invitation already responded (status: ${invitation.status})` });
        }

        if (new Date() > invitation.expiresAt) {
            invitation.status = 'expired';
            await invitation.save();
            return res.status(400).json({ message: 'Invitation has expired' });
        }

        invitation.status = 'accepted';
        await invitation.save();

        const existingApplication = await Application.findOne({
            jobId: invitation.jobId,
            candidateId: invitation.candidateId
        });

        if (!existingApplication) {
            const application = new Application({
                jobId: invitation.jobId,
                candidateId: invitation.candidateId,
                status: 'APPLIED',
                coverLetter: `Applied via invitation from recruiter. Message: ${invitation.message || 'N/A'}`,
                timeline: [{
                    status: 'APPLIED',
                    updatedAt: new Date(),
                    note: 'Application automatically created from invitation acceptance'
                }]
            });
            await application.save();
        }

        res.status(200).json({
            message: 'Invitation accepted successfully',
            invitation
        });
    } catch (error) {
        console.error('Error accepting invitation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const rejectInvitation = async (req, res) => {
    try {
        const invitation = await Invitation.findById(req.params.id);

        if (!invitation) {
            return res.status(404).json({ message: 'Invitation not found' });
        }

        if (invitation.candidateId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to reject this invitation' });
        }

        if (invitation.status !== 'pending') {
            return res.status(400).json({ message: 'Invitation already responded' });
        }

        invitation.status = 'declined';
        await invitation.save();

        res.status(200).json({
            message: 'Invitation rejected successfully',
            invitation
        });
    } catch (error) {
        console.error('Error rejecting invitation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
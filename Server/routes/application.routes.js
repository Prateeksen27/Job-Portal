import express from 'express';
import { body, param, query } from 'express-validator';
import { applyJob, getUserApplications, getJobApplications, updateApplicationStatus, getApplicationById } from '../controllers/application.controller.js';
import { verifyToken, requireRole } from '../middleware/verifyToken.js';

const router = express.Router();

const applyValidation = [
    body('jobId').isMongoId().withMessage('Invalid job ID'),
    body('coverLetter').optional().trim(),
    body('resume').optional().isObject()
];

const updateStatusValidation = [
    param('id').isMongoId().withMessage('Invalid application ID'),
    body('status').isIn(['APPLIED', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'REJECTED', 'HIRED']).withMessage('Invalid status'),
    body('note').optional().trim()
];

router.post('/apply', 
    verifyToken, 
    requireRole('JOB_SEEKER'),
    applyValidation, 
    applyJob
);

router.get('/user', 
    verifyToken, 
    requireRole('JOB_SEEKER'),
    getUserApplications
);

router.get('/job/:jobId', 
    verifyToken, 
    requireRole('RECRUITER'),
    param('jobId').isMongoId().withMessage('Invalid job ID'),
    getJobApplications
);

router.get('/:id', 
    verifyToken,
    getApplicationById
);

router.put('/status/:id', 
    verifyToken, 
    requireRole('RECRUITER'),
    updateStatusValidation, 
    updateApplicationStatus
);

export default router;
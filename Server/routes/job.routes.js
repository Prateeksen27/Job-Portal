import express from 'express';
import { body, param, query } from 'express-validator';
import { createJob, getJobs, getJobById, updateJob, deleteJob, getMyJobs, getJobApplicants } from '../controllers/job.controller.js';
import { verifyToken, requireRole } from '../middleware/verifyToken.js';

const router = express.Router();

const createJobValidation = [
    body('title').trim().notEmpty().withMessage('Job title is required'),
    body('description').trim().notEmpty().withMessage('Job description is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('jobType').isIn(['remote', 'hybrid', 'onsite']).withMessage('Invalid job type'),
    body('experience').optional().isIn(['fresher', '1-2 years', '3-5 years', '5-10 years', '10+ years']),
    body('skills').optional().isArray(),
    body('company.name').trim().notEmpty().withMessage('Company name is required')
];

const updateJobValidation = [
    param('id').isMongoId().withMessage('Invalid job ID'),
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('location').optional().trim().notEmpty(),
    body('jobType').optional().isIn(['remote', 'hybrid', 'onsite']),
    body('status').optional().isIn(['open', 'closed'])
];

router.post('/create', 
    verifyToken, 
    requireRole('RECRUITER'), 
    createJobValidation, 
    createJob
);

router.get('/', getJobs);

router.get('/my-jobs', 
    verifyToken, 
    requireRole('RECRUITER'), 
    getMyJobs
);

router.get('/recruiter', 
    verifyToken, 
    requireRole('RECRUITER'), 
    getMyJobs
);

router.get('/:id', 
    param('id').isMongoId().withMessage('Invalid job ID'), 
    getJobById
);

router.put('/:id', 
    verifyToken, 
    requireRole('RECRUITER'), 
    updateJobValidation, 
    updateJob
);

router.delete('/:id', 
    verifyToken, 
    requireRole('RECRUITER'), 
    param('id').isMongoId().withMessage('Invalid job ID'), 
    deleteJob
);

router.get('/:id/applicants', 
    verifyToken, 
    requireRole('RECRUITER'), 
    param('id').isMongoId().withMessage('Invalid job ID'),
    getJobApplicants
);

export default router;
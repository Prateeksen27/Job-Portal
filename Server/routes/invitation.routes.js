import express from 'express';
import { body, param } from 'express-validator';
import { sendInvitation, getUserInvitations, getRecruiterInvitations, acceptInvitation, rejectInvitation } from '../controllers/invitation.controller.js';
import { verifyToken, requireRole } from '../middleware/verifyToken.js';

const router = express.Router();

const sendValidation = [
    body('candidateId').isMongoId().withMessage('Invalid candidate ID'),
    body('jobId').isMongoId().withMessage('Invalid job ID'),
    body('message').optional().trim().isLength({ max: 1000 })
];

router.post('/send', 
    verifyToken, 
    requireRole('RECRUITER'),
    sendValidation, 
    sendInvitation
);

router.get('/user', 
    verifyToken, 
    requireRole('JOB_SEEKER'),
    getUserInvitations
);

router.get('/recruiter', 
    verifyToken, 
    requireRole('RECRUITER'),
    getRecruiterInvitations
);

router.put('/accept/:id', 
    verifyToken, 
    requireRole('JOB_SEEKER'),
    acceptInvitation
);

router.put('/reject/:id', 
    verifyToken, 
    requireRole('JOB_SEEKER'),
    rejectInvitation
);

export default router;
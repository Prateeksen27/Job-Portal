import express from 'express';
import { login, register, refreshToken, logout } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', verifyToken, logout);
router.get('/verify', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid', user: req.user });
});

export default router;
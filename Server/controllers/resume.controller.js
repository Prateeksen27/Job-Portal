import Profile from '../models/profile.model.js';
import fs from 'fs';
import path from 'path';

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        let profile = await Profile.findOne({ userId: req.user.id });

        if (profile && profile.resume && profile.resume.url) {
            const oldFilePath = path.join(process.cwd(), 'uploads', 'resumes', path.basename(profile.resume.url));
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        if (!profile) {
            profile = new Profile({ userId: req.user.id });
        }

        profile.resume = {
            url: `/uploads/resumes/${req.file.filename}`,
            fileName: req.file.originalname,
            uploadedAt: new Date()
        };

        await profile.save();

        res.status(200).json({
            message: 'Resume uploaded successfully',
            resume: profile.resume
        });
    } catch (error) {
        console.error('Error uploading resume:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getResume = async (req, res) => {
    try {
        const { userId } = req.params;

        const profile = await Profile.findOne({ userId });

        if (!profile || !profile.resume || !profile.resume.url) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.status(200).json({ resume: profile.resume });
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.user.id });

        if (!profile || !profile.resume || !profile.resume.url) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        const filePath = path.join(process.cwd(), 'uploads', 'resumes', path.basename(profile.resume.url));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        profile.resume = undefined;
        await profile.save();

        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
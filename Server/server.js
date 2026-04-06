import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/user.auth.js'
import jobRoutes from './routes/job.routes.js'
import profileRoutes from './routes/profile.routes.js'
import applicationRoutes from './routes/application.routes.js'
import resumeRoutes from './routes/resume.routes.js'
import invitationRoutes from './routes/invitation.routes.js'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import rateLimit from 'express-rate-limit';
dotenv.config();

const app = express();
const allowed = ["https://job-portal-one-sooty.vercel.app","http://localhost:3000"]

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000000,
  message: { message: 'Too many attempts, please try again later' }
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100000000,
  message: { message: 'Too many requests, please try again later' }
});

app.use(
  cors({
    origin: allowed,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/jobs', generalLimiter, jobRoutes);
app.use('/api/profiles', generalLimiter, profileRoutes);
app.use('/api/applications', generalLimiter, applicationRoutes);
app.use('/api/resume', generalLimiter, resumeRoutes);
app.use('/api/invitations', generalLimiter, invitationRoutes);

mongoose.connect(process.env.URI).then(async () => {
  console.log("Connected to MongoDB");
  const jobIndexes = await mongoose.connection.db.collection('jobs').indexes();
  for (const idx of jobIndexes) {
    if (idx.key && idx.key.email) {
      console.log('Removing invalid email index from jobs collection');
      await mongoose.connection.db.collection('jobs').dropIndex('email_1');
    }
  }
})
app.get('/', (req, res) => {
  res.send('Welcome to the CMS Server');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/user.auth.js'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
const allowed = ["https://job-portal-one-sooty.vercel.app","http://localhost:3000"]

app.use(
  cors({
    origin: allowed,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // important for cookies/session
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth',authRoutes);
mongoose.connect(process.env.URI).then(()=>{
  console.log("Connected to MongoDB");
})
app.get('/', (req, res) => {
  res.send('Welcome to the CMS Server');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        maxlength: [200, 'Job title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Job description is required']
    },
    requirements: {
        type: String
    },
    responsibilities: {
        type: String
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    jobType: {
        type: String,
        enum: ['remote', 'hybrid', 'onsite'],
        required: true
    },
    experience: {
        type: String,
        enum: ['fresher', '1-2 years', '3-5 years', '5-10 years', '10+ years'],
        default: 'fresher'
    },
    salary: {
        min: {
            type: Number,
            min: 0
        },
        max: {
            type: Number,
            min: 0
        },
        currency: {
            type: String,
            default: 'INR'
        }
    },
    skills: [{
        type: String,
        trim: true
    }],
    company: {
        name: {
            type: String,
            required: true
        },
        logo: String,
        website: String,
        description: String
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Recruiter ID is required']
    },
    applicants: {
        type: Number,
        default: 0
    },
    deadline: {
        type: Date
    }
}, {
    timestamps: true
});

jobSchema.index({ recruiterId: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ title: 'text', description: 'text' });

const Job = mongoose.model('Job', jobSchema);
export default Job;
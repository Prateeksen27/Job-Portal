import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Job ID is required']
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Candidate ID is required']
    },
    status: {
        type: String,
        enum: ['APPLIED', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'REJECTED', 'HIRED'],
        default: 'APPLIED'
    },
    coverLetter: {
        type: String
    },
    resume: {
        url: String,
        fileName: String
    },
    answers: [{
        question: String,
        answer: String
    }],
    timeline: [{
        status: String,
        updatedAt: Date,
        note: String
    }],
    notes: {
        type: String
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

applicationSchema.index({ jobId: 1 });
applicationSchema.index({ candidateId: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ createdAt: -1 });
applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });

applicationSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;
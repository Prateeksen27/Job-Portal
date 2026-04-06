import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Recruiter ID is required']
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Candidate ID is required']
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Job ID is required']
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined', 'expired'],
        default: 'pending'
    },
    message: {
        type: String,
        maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    interview: {
        scheduledAt: Date,
        duration: {
            type: Number,
            min: 15,
            max: 180
        },
        meetingLink: String,
        location: String,
        notes: String
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    respondedAt: Date
}, {
    timestamps: true
});

invitationSchema.index({ recruiterId: 1 });
invitationSchema.index({ candidateId: 1 });
invitationSchema.index({ jobId: 1 });
invitationSchema.index({ status: 1 });
invitationSchema.index({ createdAt: -1 });
invitationSchema.index({ recruiterId: 1, candidateId: 1, jobId: 1 }, { unique: true });

invitationSchema.pre('save', function(next) {
    if (this.isModified('status') && this.status !== 'pending') {
        this.respondedAt = new Date();
    }
    next();
});

const Invitation = mongoose.model('Invitation', invitationSchema);
export default Invitation;
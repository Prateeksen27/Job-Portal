import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    // Basic Information
    headline: {
        type: String,
        maxlength: [200, 'Headline cannot exceed 200 characters']
    },
    summary: {
        type: String,
        maxlength: [2000, 'Summary cannot exceed 2000 characters']
    },
    location: {
        city: String,
        country: String
    },
    phone: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    portfolio: {
        type: String,
        trim: true
    },
    linkedin: {
        type: String,
        trim: true
    },
    github: {
        type: String,
        trim: true
    },
    coverImage: {
        type: String,
        default: null
    },
    // Professional Details
    skills: [{
        type: String,
        trim: true
    }],
    yearsOfExperience: {
        type: Number,
        default: 0
    },
    currentCompany: {
        type: String,
        trim: true
    },
    currentRole: {
        type: String,
        trim: true
    },
    expectedSalary: {
        min: Number,
        max: Number,
        currency: {
            type: String,
            default: 'INR'
        }
    },
    availability: {
        type: String,
        enum: ['immediate', '1-week', '2-weeks', '1-month', '2-months', 'not-available'],
        default: 'immediate'
    },
    preferredJobType: {
        type: String,
        enum: ['remote', 'hybrid', 'onsite', 'any'],
        default: 'any'
    },
    // Work Experience
    experience: [{
        _id: mongoose.Schema.Types.ObjectId,
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        location: String,
        startDate: {
            type: Date,
            required: true
        },
        endDate: Date,
        current: {
            type: Boolean,
            default: false
        },
        description: String
    }],
    // Education
    education: [{
        _id: mongoose.Schema.Types.ObjectId,
        institution: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        field: String,
        startYear: Number,
        endYear: Number,
        description: String
    }],
    // Projects
    projects: [{
        _id: mongoose.Schema.Types.ObjectId,
        title: {
            type: String,
            required: true
        },
        description: String,
        technologies: [String],
        link: String,
        githubRepo: String
    }],
    // Certifications
    certifications: [{
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true
        },
        organization: {
            type: String,
            required: true
        },
        issueDate: Date,
        expiryDate: Date,
        credentialId: String,
        credentialUrl: String
    }],
    // Languages
    languages: [{
        language: {
            type: String,
            required: true
        },
        proficiency: {
            type: String,
            enum: ['native', 'fluent', 'conversational', 'basic'],
            default: 'conversational'
        }
    }],
    // Resume
    resume: {
        url: String,
        fileName: String,
        uploadedAt: Date
    },
    // Profile Visibility
    isPublic: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

profileSchema.index({ userId: 1 }, { unique: true });
profileSchema.index({ skills: 1 });
profileSchema.index({ location: 1 });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateTokens = (userId, role) => {
    const accessToken = jwt.sign(
        { id: userId, role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + '_refresh',
        { expiresIn: '7d' }
    );
    
    return { accessToken, refreshToken };
};

export const register = async (req, res)=>{
    const { username, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: `User with email ${email} already exists` });
        }
        
        const validRole = role || "JOB_SEEKER";
        if (validRole !== "JOB_SEEKER" && validRole !== "RECRUITER") {
            return res.status(400).json({ message: "Invalid role" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword,
            role: validRole
        });
        await newUser.save();
        
        const { accessToken, refreshToken } = generateTokens(newUser._id, newUser.role);
        
        newUser.refreshToken = refreshToken;
        await newUser.save();
        
        res.status(201).json({ 
            message: `registered successfully`,
            token: accessToken,
            refreshToken: refreshToken,
            user: { 
                id: newUser._id, 
                username: newUser.username, 
                email: newUser.email,
                role: newUser.role 
            }
         });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const login = async (req, res)=>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: `User with email ${email} not found` });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }   
        
        const { accessToken, refreshToken } = generateTokens(user._id, user.role);
        
        user.refreshToken = refreshToken;
        await user.save();
        
        res.status(200).json({ 
            token: accessToken,
            refreshToken: refreshToken,
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                role: user.role 
            } 
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }
    
    try {
        const decoded = jwt.verify(
            refreshToken, 
            process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + '_refresh'
        );
        
        const user = await User.findById(decoded.id);
        
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
        
        const tokens = generateTokens(user._id, user.role);
        
        user.refreshToken = tokens.refreshToken;
        await user.save();
        
        res.status(200).json({ 
            token: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
}

export const logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
        
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
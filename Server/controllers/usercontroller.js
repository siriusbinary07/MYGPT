import User from "../models/user.js";
import jwt from "jsonwebtoken";
//Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// API to register a new user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        const token = generateToken(newUser);
        res.status(201).json({ success: true, message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};
//Api to login a user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = generateToken(user);
        res.json({ success: true, token });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in", error });
    }
}

// API to get user Data
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        return res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user data", error });
    }
}

// api to get published images
export const getPublishedImages = async (req, res) => {
    try {
        const publishedImageMessages = await Chat.aggregate([
            { $unwind: "$messages" },
            { $match: { 
                "messages.isPublished" : true,
                "messages.isImage": true
            } },
            { $project: {
                _id: 0,
                imageUrl: "$messages.content",
                userName: "$userName",
            }
        }]);
        return res.json({ success: true, images: publishedImageMessages.reverse() });
    } catch (error) {
        return res.json({ success: false, message: "Error fetching published images", error });
    }
}
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required."
            });
        }
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already Exist with this email."
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            success: true,
            message: "Account Created Successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "failed to register."
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required."
            });
        }
        const user = await User.findOne({ email });
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email."
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password."
            });
        }
        generateToken(res, user, `Welcome back ${user.username}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login."
        });
    }
}

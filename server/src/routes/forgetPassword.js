import express from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Send email with password reset link using nodemailer
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "5m",
        });

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sweatset7@gmail.com",
                pass: process.env.PASSWORD,
            },
        });

        var mailOptions = {
            from: "sweatset7@gmail.com",
            to: email,
            subject: "Password Reset",
            text: `Click on the link to reset your password: http://localhost:5173/reset-password/${token}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        return res.status(200).json({ status: true, message: "Email sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/reset-password/:token", async (req, res) => {
    const token = req.params.token;
    const { password } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Invalid token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
        return res
            .status(200)
            .json({ status: true, message: "Password reset successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export { router as forgetPasswordRouter };

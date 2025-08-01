import { User } from "../models/User.js";
import { additionalInfo } from "../models/AdditionalInfo.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "./verify.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ msg: "User with this email already exists" });
        }

        user = await User.findOne({ username });
        if (user) {
            return res
                .status(400)
                .json({ msg: "User with this username already exists" });
        }

        user = new User({
            name,
            username,
            email,
            password,
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Create jwt token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/additional-info",verifyToken, async (req, res) => {
    try {
        const { userLoggedin, dob, weight, height, imageLink } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ username: userLoggedin });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "User does not exist" });
        }

        const addData = new additionalInfo({
            username: userLoggedin,
            dob,
            weight,
            height,
            imageLink
        });

        await addData.save();

        res.json({ msg: "Additional information saved successfully!" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export { router as UserRouter };

import express from "express";
import { Trainer } from "../models/Trainer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (role === "trainer") {
            const trainer = await Trainer.findOne({ username });
            if (!trainer) return res.status(400).send("Invalid credentials");

            const validPassword = await bcrypt.compare(
                password,
                trainer.password
            );
            if (!validPassword)
                return res.status(400).send("Invalid credentials");

            const token = req.headers.authorization || req.cookies.token;
            if (token) {
                return res.status(200).send("You are already logged in");
            }

            const newToken = jwt.sign(
                { username: trainer.username, role: "trainer" },
                process.env.JWT_SECRET,
                // { expiresIn: "1h" }
            );
            res.cookie("token", newToken, { httpOnly: true, secure: true });
            res.cookie("username", username, { secure: true })
            return res.json({ login: true, role: "trainer", username });
            
        } else if (role === "user") {
            const user = await User.findOne({ username });
            if (!user) return res.status(400).send("Invalid credentials");

            const validPassword = await bcrypt.compare( 
                password,
                user.password
            );
            
            if (!validPassword)
                return res.status(400).send("Invalid credentials");

            const token = req.headers.authorization || req.cookies.token;
            if (token) {
                return res.status(200).send("You are already logged in");
            }

            const newToken = jwt.sign(
                { username: user.username, role: "user" },
                process.env.JWT_SECRET,
                // { expiresIn: "1h" }
            );
            res.cookie("token", newToken, { httpOnly: true, secure: true });
            res.cookie("username", username, { secure: true })
            return res.json({ login: true, role: "user" , username});

        } else {
            // other roles
            res.status(400).send("Invalid role");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});


router.get("/logout", (req, res) => {
    res.clearCookie("username");
    res.clearCookie("token").json({ status: true, message: "Logged out" });
});

export { router as AllRouter };

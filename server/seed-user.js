import express from "express";
import bycrypt from "bcryptjs";
import { User } from "./src/models/User.js";
import connectDB from "./src/db/db.js";

connectDB();

async function seed() {
    try {
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            const hashedPassword = await bycrypt.hash("password", 10);
            const newUser = new User({
                username: "aditya",
                name: "Aditya Pandey",
                email: "asadityasonu@gmail.com",
                password: hashedPassword,
            });

            await newUser.save();
            console.log("User seeded");
        } else {
            console.log("User already seeded");
        }
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
}

seed();

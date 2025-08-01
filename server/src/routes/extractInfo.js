import express from "express";
import { User } from "../models/User.js";
import { pushUpRecord } from "../models/PushUpRecord.js";
import { additionalInfo } from "../models/AdditionalInfo.js";
import { verifyToken } from "./verify.js";
const router = express.Router();

router.post("/profile",verifyToken, async (req, res) => {
    try {
        const { userLoggedin } = req.body;

        const user = await User.findOne({ username: userLoggedin });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const pushUp = await pushUpRecord.find({ username: userLoggedin });

        return res.send({ user, pushUp });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
});

router.post("/addinfo",verifyToken, async (req, res) => {
    try {
        const { userLoggedin } = req.body;

        const info = await additionalInfo.findOne({ username: userLoggedin }).sort({ _id: -1 });

        if (!info) {
            return res.status(404).send({ message: 'Additional info not found' });
        }

        return res.send({ info });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
});


 router.post("/pushup",verifyToken, async (req, res) => {
    try {
        const { userLoggedin } = req.body;

        // Calculate today's start and end time
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 00:00:00

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Next day 00:00:00

        // Filter records for today using dateRecorded
        const records = await pushUpRecord.find({
            username: userLoggedin,
            dateRecorded: {
                $gte: today,
                $lt: tomorrow,
            },
        });

        const totalPushUpCount = records.reduce(
            (sum, rec) => sum + (rec.pushUpCount || 0),
            0
        );

        const totalCaloricBurn = records.reduce(
            (sum, rec) => sum + (rec.caloricBurn || 0),
            0
        );

        return res.send({ totalPushUpCount, totalCaloricBurn });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" });
    }
});




export { router as userLoggedinRouter };

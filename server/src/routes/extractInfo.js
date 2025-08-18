import express from "express";
import { User } from "../models/User.js";
import { pushUpRecord } from "../models/PushUpRecord.js";
import { additionalInfo } from "../models/AdditionalInfo.js";
import { verifyToken } from "./verify.js";

const router = express.Router();

/**
 * Fetch User Profile
 */
router.post("/profile", verifyToken, async (req, res) => {
  try {
    const { userLoggedin } = req.body;

    const user = await User.findOne({ username: userLoggedin });
    if (!user) return res.status(404).json({ status: false, message: "User not found" });

    const pushUp = await pushUpRecord.find({ username: userLoggedin });

    return res.json({ status: true, user, pushUp });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

/**
 * Fetch Additional Info (for pre-fill in form)
 */
router.post("/addinfo", verifyToken, async (req, res) => {
  try {
    const { userLoggedin } = req.body;

    const info = await additionalInfo.findOne({ username: userLoggedin });

    if (!info) return res.status(404).json({ status: false, message: "Additional info not found" });

    return res.json({ status: true, info });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

/**
 * Add or Update Additional Info (Upsert)
 */
router.post("/addinfo/upsert", verifyToken, async (req, res) => {
  try {
    const { userLoggedin, dob, weight, height, imageLink } = req.body;

    // Backend validation
    if (!dob || !weight || !height) {
      return res
        .status(400)
        .json({ status: false, message: "DOB, weight, and height are required" });
    }

    const updatedInfo = await additionalInfo.findOneAndUpdate(
      { username: userLoggedin },
      { dob, weight, height, imageLink },
      { new: true, upsert: true }
    );

    return res.json({ status: true, info: updatedInfo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

/**
 * Fetch Today's PushUp Stats
 */
router.post("/pushup", verifyToken, async (req, res) => {
  try {
    const { userLoggedin } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const records = await pushUpRecord.find({
      username: userLoggedin,
      dateRecorded: { $gte: today, $lt: tomorrow },
    });

    const totalPushUpCount = records.reduce((sum, rec) => sum + (rec.pushUpCount || 0), 0);
    const totalCaloricBurn = records.reduce((sum, rec) => sum + (rec.caloricBurn || 0), 0);

    return res.json({ status: true, totalPushUpCount, totalCaloricBurn });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

export { router as userLoggedinRouter };

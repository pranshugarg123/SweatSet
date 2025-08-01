import express from "express";
import { pushUpRecord } from "../models/PushUpRecord.js";
import { verifyToken } from "./verify.js";
import { User } from "../models/User.js";
const router = express.Router();

router.post("/data", verifyToken,async (req, res) => {
    const { username, exportPushCount, caloricBurn } = req.body;

    // TODO: Validate the input data

    const newPushUpRecord = new pushUpRecord({
        username: username,
        pushUpCount: exportPushCount,
        caloricBurn: caloricBurn,
        note: "",
    });

    try {
        const savedPushUpRecord = await newPushUpRecord.save();
        res.json({ success: true, data: savedPushUpRecord });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ success: false, error: err.message });
    }
});
router.post("/target",verifyToken, async (req, res) => {
  const { username, targetPushUps } = req.body;

  try {
    await User.updateOne({ username }, { targetPushUps });
    res.json({ success: true, message: "Target updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get target push-ups for user
router.post("/target/get",verifyToken, async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ targetPushUps: user.targetPushUps || 100 });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
export { router as pushUpRouter };

import express from "express";
import { pushUpRecord } from "../models/PushUpRecord.js";
import { verifyToken } from "./verify.js";
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

export { router as pushUpRouter };

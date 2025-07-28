import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
const router = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user data to the request
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized" });
    }
}

router.get('/verifyUser', verifyToken, (req, res) => {
    res.status(200).json({ status: true, message: "Verified", user: req.user });
});

export { router as verifyRouter };

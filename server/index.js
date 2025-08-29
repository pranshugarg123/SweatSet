import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AllRouter } from "./src/routes/auth.js";
import { UserRouter } from "./src/routes/register.js";
import { pushUpRouter } from "./src/routes/pushUp.js";
import { forgetPasswordRouter } from "./src/routes/forgetPassword.js";
import { verifyRouter } from "./src/routes/verify.js";
import { userLoggedinRouter } from "./src/routes/extractInfo.js";
import { contactRouter } from "./src/routes/contact.js";
dotenv.config();
const app = express();
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Your local frontend
    credentials: true
  })
);

app.use(cookieParser());

app.use("/auth", AllRouter);

// Register route
app.use("/register", UserRouter);

// PushUp route
app.use("/pushUp", pushUpRouter);

// Forget Password route
app.use("/password", forgetPasswordRouter);

// Verify route
app.use("/verify", verifyRouter);

// Extract user info route
app.use("/extract", userLoggedinRouter);
app.use("/contact", contactRouter);

app.listen( 5001, () => {
  console.log(`Server is listening on port 5001`);
});


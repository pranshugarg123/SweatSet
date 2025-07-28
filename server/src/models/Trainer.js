import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlwngth: 6,
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    },
});

const TrainerModel = mongoose.model("Trainer", trainerSchema);
export { TrainerModel as Trainer };

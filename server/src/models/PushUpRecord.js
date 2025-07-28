import mongoose from "mongoose";

const pushUpRecordSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        ref: "User", // refers to the 'User' model
    },
    pushUpCount: {
        type: Number,
        required: true,
    },
    caloricBurn: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: false,
        default: "",
    },
    dateRecorded: {
        type: Date,
        default: Date.now,
    },
});

const PushUpRecordModel = mongoose.model("PushUpRecord", pushUpRecordSchema);
export { PushUpRecordModel as pushUpRecord };

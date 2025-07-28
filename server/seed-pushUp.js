import mongoose from "mongoose";
import { User } from "./src/models/User.js";
import { pushUpRecord } from "./src/models/PushUpRecord.js";
import connectDB from "./src/db/db.js";

async function seedPushUpRecords() {
    try {
        await connectDB();

        // Find a user to associate the push-up records with
        const user = await User.findOne();
        if (!user) {
            console.log("No users found, cannot seed push-up records");
            return;
        }

        // Define some push-up records
        const pushUpRecords = [
            {
                username: user.username,
                pushUpCount: 20,
                caloricBurn: 100,
                note: "First record",
            },
            {
                username: user.username,
                pushUpCount: 25,
                caloricBurn: 125,
                note: "Improved",
            },
            {
                username: user.username,
                pushUpCount: 30,
                caloricBurn: 150,
                note: "Best so far",
            },
        ];

        // Insert the records into the database
        await pushUpRecord.insertMany(pushUpRecords);

        console.log("Push-up records seeded");
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
}

seedPushUpRecords();

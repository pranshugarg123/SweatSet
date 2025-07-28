import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
        minlength: 6
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    }
});

const UserModel = mongoose.model('User', userSchema);
export { UserModel  as User};
import mongoose from 'mongoose';

const additionalInfoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        ref: 'User',
    },
    dob: {
        type: Date,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: false,
        default: '',
    },
});

const AdditionalInfoModel = mongoose.model('AdditionalInfo', additionalInfoSchema);

export { AdditionalInfoModel as additionalInfo };
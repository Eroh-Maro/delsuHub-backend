import mongoose from "mongoose";

const concernSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }, {
        timestamps: true,
    });

const Concern = mongoose.model('Concern', concernSchema);

 export default Concern;   
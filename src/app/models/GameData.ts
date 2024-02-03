import mongoose, { Schema } from "mongoose";
import board from "./Board";

const gameDataSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: 'title'
    },
    lastModified: {
        type: Date,
        default: () => Date.now()
    },
    author: {
        type: String,
        required: true,
        default: () => "Author"
    },
    boards: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: 'board',
        }],
        required: true,
        default: () => {
            const s = new board();
            s.save();
            return s
        }
    }
})

const gameData = mongoose.models.gameData || mongoose.model("gameData", gameDataSchema);

export default gameData;
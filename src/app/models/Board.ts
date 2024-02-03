import mongoose, { Schema } from "mongoose";


const columnSchema = new Schema({
    colTitle: {
        type: String,
        required: true,
        default: 'Column title'
    },
    cards: {
        type: [{
            _id: false,
            answer: {
                type: String,
                default: () => "answer here",
            },
            question: {
                type: String,
                default: () => "question here"
            },
            value: {
                type: Number,
                default: () => 100
            },
        }],
        required: true,
        default: () => {
            const arr = [];
            for (let i = 1; i < 6; i++) {
                arr.push({
                    answer: 'answer here',
                    question: 'question here',
                    value: 100 * i
                })
            }
            return arr;
        }
    },
}, { _id: false })
const column = mongoose.models.column || mongoose.model("column", columnSchema);

const boardSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: 'Board Title'
    },
    columns: {
        type: [columnSchema],
        required: true,
        default: () => {
            const arr = []
            for (let i = 0; i < 5; i++) {
                arr.push(new column());
            }
            return arr;
        }
    }
})

const board = mongoose.models.board || mongoose.model("board", boardSchema)
export default board
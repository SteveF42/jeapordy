import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})

const User = mongoose.models.users || mongoose.model("users",usersSchema);

export default User;
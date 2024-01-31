import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})

const User = mongoose.models.Users || mongoose.model("Users",usersSchema);

export default User;
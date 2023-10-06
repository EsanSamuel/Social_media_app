import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "user already exists!"],
        required: [true, "Email is required"]
    },
    username: {
        type: String,
        required: [true, "username already exists!"],
    },
    image: {
        type: String
    }
})

const User = models.User || model("User", userSchema)

export default User

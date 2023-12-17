import { Schema, models, model } from "mongoose";

//defining a model for user when signed in
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = models.User || model("User", UserSchema);

export default User;

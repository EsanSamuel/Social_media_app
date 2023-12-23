import { Schema, models, model } from "mongoose";

interface IUser {
  username:string
  image:string
  email:string
}

//defining a model for user when signed in
const UserSchema = new Schema<IUser>({
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

const User = models.User || model<IUser>("User", UserSchema);

export default User;

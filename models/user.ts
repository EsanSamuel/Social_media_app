import { Schema, models, model , Document} from "mongoose";

interface IUser extends Document {
  username: string;
  image: string;
  email: string;
  bio: string;
  coverImage: string
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
  bio:{
    type: String 
  },
  coverImage: {
    type:String
  }
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;

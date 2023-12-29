import mongoose, { Schema, models, model } from "mongoose";

interface ISave {
  poster: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
}

const SaveSchema = new Schema<ISave>({
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const SavePost = models.SavePost || model<ISave>("SavePost", SaveSchema);

export default SavePost;

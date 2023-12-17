import { Schema, models, model } from "mongoose";

const SaveSchema = new Schema({
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const SavePost = models.SavePost || model("SavePost", SaveSchema);

export default SavePost;

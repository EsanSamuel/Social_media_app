import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;

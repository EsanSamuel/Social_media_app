import mongoose, { Schema, models, model } from "mongoose";

interface IPost {
  poster: mongoose.Types.ObjectId;
  post: string;
  image: string;
  likeCounts: number;
}

const PostSchema = new Schema<IPost>({
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
  likeCounts: { type: Number, default: 0 },
});

const Post = models.Post || model<IPost>("Post", PostSchema);

export default Post;

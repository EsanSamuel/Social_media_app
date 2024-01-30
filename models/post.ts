import mongoose, { Schema, models, model, Document } from "mongoose";

interface IPost extends Document {
  poster: mongoose.Types.ObjectId;
  post: string;
  image: string;
  likeCounts: number;
  createdAt: any;
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
  likeCounts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
    default: () => new Date()toISOString(),
  },
});

const Post = models.Post || model<IPost>("Post", PostSchema);

export default Post;

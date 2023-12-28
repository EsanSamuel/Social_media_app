import mongoose, { Schema, models, model } from "mongoose";

interface ILike{
  poster: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
}

const LikeSchema = new Schema<ILike>({
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Like = models.Like|| model<ILike>("Like", LikeSchema);

export default Like;

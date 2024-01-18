import mongoose, { Schema, models, model, Document } from "mongoose";

interface IComment extends Document {
  poster: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  comment: string;
}

const CommentSchema = new Schema<IComment>({
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: String,
  },
});

const Comment = models.Comment || model<IComment>("Comment", CommentSchema);

export default Comment;

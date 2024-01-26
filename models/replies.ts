import mongoose, { Schema, models, model, Document } from "mongoose";

interface IReply extends Document {
  poster: mongoose.Types.ObjectId;
  comment: mongoose.Types.ObjectId;
  reply: string;
}

const ReplySchema = new Schema<IReply>({
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  reply: {
    type: String,
  },
});

const Reply = models.Reply || model<IReply>("Reply", ReplySchema);

export default Reply;

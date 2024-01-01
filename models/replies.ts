import mongoose, { Schema, models, model } from "mongoose";

interface IReply {
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

const Reply = models.Reply|| model<IReply>("Comment", ReplySchema);

export default Reply;

import { Schema, models, model } from 'mongoose'

const postSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, "prompt is required"]
    },
    tag: {
        type: String,
        required: [true, "tag is required"]
    }
})

const Prompt = models.Prompt || model('Prompt', postSchema)

export default Prompt
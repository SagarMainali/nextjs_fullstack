import mongoose, { Schema, model } from "mongoose";

export interface IPost {
    content: string,
    createdAt: Date,
    lastEdited: Date,
}

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    lastEdited: {
        type: Date,
    },
})

const Post = mongoose.models.Post || model<IPost>('Post', postSchema);

export default Post;

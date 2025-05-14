// import { posts } from "@/data/posts";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/Post";
import dbConnect from "@/lib/mongoDbConnect";
import mongoose from "mongoose";

// all the route handler function below uses the concept of dynamic route handling
// get a specific post based on id
export async function GET(_request: NextRequest, { params }: { params: { _id: string } }) {
    try {
        const { _id } = await params; // using await to only avoid warning
        // const post = posts.find(post => post.id === parseInt(_id));
        if (!mongoose.Types.ObjectId.isValid(_id)) { // check if the params id type matches the one in mongodb
            return NextResponse.json({ message: "The specified ID is in invalid format!" }, { status: 400 });
        }

        await dbConnect();

        const post = await Post.findById(_id);
        if (!post) {
            return NextResponse.json({ message: "The specified ID doesn't match any post!" }, { status: 404 });
        }
        return NextResponse.json({ post });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

// update specific post based on id
export async function PATCH(request: NextRequest, { params }: { params: { _id: string } }) {
    try {
        const { _id } = await params;
        const { content } = await request.json();
        // const index = posts.findIndex(post => post.id === parseInt(_id));
        // posts[index].content = content;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return NextResponse.json({ message: "The specified ID is in invalid format!" });
        }

        await dbConnect();

        const updatedPost = await Post.findByIdAndUpdate(
            _id,
            { 
                content,
                lastEdited: new Date()
            },
            { new: true } // return updated post
        );

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

// delete specific post based on id
export async function DELETE(_request: NextRequest, { params }: { params: { _id: string } }) {
    try {
        const { _id } = await params;
        // const index = posts.findIndex(post => post.id === parseInt(_id));
        // const deletedPost = posts[index]
        // posts.splice(index, 1)

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return NextResponse.json({ message: "The specfied ID is in invalid format!" });
        }

        await dbConnect();

        const deletedPost = await Post.findByIdAndDelete(_id);

        if (!deletedPost) {
            return NextResponse.json({ message: "The specified ID doesn't match any post!" });
        }

        return NextResponse.json(deletedPost, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
// import { posts } from "@/data/posts"
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoDbConnect";
import Post from "@/models/Post";

// get all posts
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('query');
        // const filteredPosts = query
        //     ? posts.filter(post => post.id.toString().trim().includes(query) || post.content.trim().includes(query))
        //     : posts

        await dbConnect();

        const filter = query ? { content: { $regex: query, $options: 'i' } } : {};

        const filteredPosts = await Post.find(filter);

        // handle what type of message to send when there are no posts to send at all but not sure of the query availability 
        if (filteredPosts.length === 0) {
            const message = query
                ? "Your query doesn't match any specific post"
                : "There are no posts at the moment"
            return NextResponse.json({ message });
        }

        return NextResponse.json({ posts: filteredPosts });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

// add a new post in the array
export async function POST(request: Request) {
    await dbConnect();
    const post = await request.json();
    // const newPost = {
    //     id: Date.now(), // add id
    //     content: post.content
    // }
    // posts.push(newPost);
    const newPost = new Post({
        content: post.content,
        createdAt: new Date(), // add new prop from here
    })
    const result = await newPost.save();
    return NextResponse.json(result, { status: 201 });

    // traditional way to send Response
    // return new Response(JSON.stringify(newPost), {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     status: 201,
    // })
}
import React from 'react'
import CreatePost from './CreatePost';
import { getDateAndTime } from '@/helper/getDateAndTime'
import Link from 'next/link'

export default async function Posts() {

    // mock delay
    // await new Promise(res => { setTimeout(res, 1500) });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/`);
    const parsedData: PostsRes = await res.json();
    const { message, posts } = parsedData;

    return (
        <div>
            <CreatePost />
            <div className='flex flex-col gap-10 mt-10'>
                {
                    posts
                        ? posts.reverse().map((post) => (
                            <Link href={`/posts/${post._id}`} key={post._id} className='bg-slate-700 p-8'>
                                <p className='font-medium italic'>"{post.content}"</p>
                                <div className='flex flex-col items-end text-[10px] mt-2'>
                                    <span><b>Created:</b> {getDateAndTime(new Date(post.createdAt))}</span>
                                    {post.lastEdited && <span><b>Edited:</b> {getDateAndTime(new Date(post.lastEdited))}</span>}
                                </div>
                            </Link>
                        ))
                        : <h2>{message}</h2>
                }
            </div>
        </div>
    )
}

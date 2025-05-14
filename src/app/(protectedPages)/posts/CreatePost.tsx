'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function CreatePost() {

    const [content, setContent] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (content.trim().length === 0) {
                throw new Error("Couldn't add empty post!")
            }
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            })
            const parsedData = await res.json();
            if (parsedData) {
                setContent('');
                router.refresh(); // this part only refreshes the server side logic to fetch the update data
            } else {
                throw new Error('Failed to create post!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center'>
            <input type="text" value={content} onChange={(e) => setContent(e.target.value)}
                className='border-2 border-slate-300 outline-0 min-w-[400px] py-2 px-4 rounded-md' />
            <button type='submit' className='bg-blue-700 rounded py-2 px-4 font-semibold'>Add Post</button>
        </form>
    )
}

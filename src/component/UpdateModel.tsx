import React, { useEffect, useRef, useState } from 'react'
import { useModal } from '@/context/modalContext'
import { useRouter } from 'next/navigation';

export default function UpdateModal({ post }: { post: Post }) {

    const [content, setContent] = useState(post.content);

    // post returned from the server after updating
    const [updatedPost, setUpdatedPost] = useState<Post | null>(null);

    const updatePost = async () => {
        try {

            const res = await fetch(`/api/posts/${post._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            })
            const parsedData = await res.json();
            setUpdatedPost(parsedData)
        } catch (error) {
            console.log("Couldn't perform the operation", error);
        }
    }

    const { closeModal } = useModal();

    const router = useRouter();

    const onClickHandler = () => {
        closeModal();
        router.replace('/posts');
    }

    const spanRef = useRef<HTMLInputElement>(null);

    const [inputWidth, setInputWidth] = useState(0);

    // dynamic width logic for input field according to content inside it
    useEffect(() => {
        if (spanRef.current) {
            setInputWidth(spanRef.current.offsetWidth);
        }
    }, [content])

    return (
        !updatedPost
            ? (<>
                <h3 className="text-lg font-semibold mb-4">Update Post</h3>
                <div className='relative'>
                    <span ref={spanRef} className='pointer-events-none absolute invisible whitespace-pre'>{content}</span>
                    <input type="text" autoFocus value={content} className='py-2 px-4 border-2 border-slate-300 rounded outline-0 box-content'
                        onChange={e => setContent(e.target.value)}
                        style={{ width: `${inputWidth}px` }}
                    />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button className="text-red-500 hover:underline" onClick={updatePost}>Update</button>
                    <button className="text-black hover:underline" onClick={closeModal}>Cancel</button>
                </div>
            </>)
            : (<h3>
                The post has been successfully <b>updated</b>. <button onClick={onClickHandler} className='hover:underline text-blue-300'>View other posts.</button>
            </h3>)
    )
}

import React, { useState } from 'react'
import { useModal } from '@/context/modalContext'
import { useRouter } from 'next/navigation';

export default function DeleteModal({ _id }: { _id: string }) {

    const [deletedPost, setDeletedPost] = useState<Post | null>();

    const deletePost = async () => {
        try {
            const res = await fetch(`/api/posts/${_id}`, { method: 'DELETE' });
            const parsedData = await res.json();
            setDeletedPost(parsedData);
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

    return (
        !deletedPost
            ? (<>
                <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                <p>Are you sure you want to delete this post?</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button className="text-red-500 hover:underline" onClick={deletePost}>Delete</button>
                    <button className="text-black hover:underline" onClick={closeModal}>Cancel</button>
                </div>
            </>)
            : (<h3>
                The post has been successfully <b>deleted</b>. <button onClick={onClickHandler} className='hover:underline text-blue-300'>View other posts.</button>
            </h3>)
    )
}

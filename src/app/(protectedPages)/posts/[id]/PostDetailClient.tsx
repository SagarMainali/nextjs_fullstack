'use client'

import React from 'react'
import { getDateAndTime } from '@/helper/getDateAndTime';
import { useModal } from '@/context/modalContext';
import ModalContainer from '@/component/ModalContainer';
import DeleteModal from '@/component/DeleteModal';
import UpdateModal from '@/component/UpdateModel';

export default function PostDetailClient({ response }: { response: PostRes }) {

    const { message, post } = response;

    const { openModal, modalType } = useModal();

    return message
        ? (
            <h2>{message}</h2>
        )
        : (
            <div className='flex justify-center items-center h-full'>
                <div className='flex flex-col gap-2 bg-slate-700 p-8 rounded-lg'>
                    <p className='font-medium italic'>"{post?.content}"</p>
                    <span className='text-[10px] text-start mb-3'>{post?.createdAt && getDateAndTime(new Date(post.createdAt))}</span>
                    <span className='text-sm text-end'>
                        <button className='text-blue-500 mr-2 hover:underline cursor-pointer' onClick={() => openModal('update')}>Update</button>
                        <button className='text-red-500 hover:underline cursor-pointer' onClick={() => openModal('delete')}>Delete</button>
                    </span>
                </div>

                {(modalType === 'delete') && <ModalContainer children={<DeleteModal _id={post?._id!} />} />}

                {(modalType === 'update') && <ModalContainer children={<UpdateModal  post={post!}/>} />}
            </div>
        )
}

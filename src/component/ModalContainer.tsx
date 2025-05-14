import React from 'react'

type ModalContainerT = {
    children: React.ReactNode,
}

export default function ModalContainer({ children }: ModalContainerT) {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/60'>
            <div className='p-8 bg-gray-600 rounded-md'>
                {children}
            </div>
        </div>
    )
}

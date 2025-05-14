import React from 'react'
import './loader.css'

export default function Loading() {
    return (
        <div className='absolute inset-0 flex justify-center items-center'>
            <span className='loader'></span>
        </div>
    )
}

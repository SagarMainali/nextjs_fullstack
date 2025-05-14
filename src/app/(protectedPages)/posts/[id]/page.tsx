import PostDetailClient from '@/app/(protectedPages)/posts/[id]/PostDetailClient'
import React from 'react'

export default async function Post({ params }: { params: { id: string } }) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${params.id}`);
    const parsedData: PostRes = await res.json();

    return (
        <PostDetailClient response={parsedData} />
    )
}

// this component uses the concept of partial-hydration as it is a SSR component but the component it returns is a CSR
// component as it requires interaction

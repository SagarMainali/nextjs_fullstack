type Post = {
    _id: string,
    content: string,
    createdAt: Date,
    lastEdited?: Date,
}

type PostsRes = {
    message?: string,
    posts?: Post[]
}

type PostRes = {
    message?: string,
    post?: Post
}

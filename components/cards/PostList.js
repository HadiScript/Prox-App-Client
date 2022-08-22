import React, { useContext } from 'react'


import Post from './Post'


const PostList = ({
    posts,
    handleDelete,
    handleLike,
    handleUnlike,
    handleComment,
    handleReport
}) => {


    return (
        <>
            {posts && posts.map(post => (
                <Post
                    key={post._id}
                    post={post}
                    handleDelete={handleDelete}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                    handleComment={handleComment}
                    commentsCount={4}
                    handleReport={handleReport}
                />
            ))}
        </>
    )
}

export default PostList
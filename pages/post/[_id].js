import axios from 'axios'
import { useRouter, Link } from 'next/router'
import React, { useEffect, useState } from 'react'
// import UserRoutes from '../../components/routes/UserRoutes'
// import { Avatar } from 'antd'
import Post from '../../components/cards/Post'
import { RollbackOutlined } from '@ant-design/icons'
import UserRoutes from '../../components/routes/UserRoutes'

const PostComments = () => {

    const router = useRouter()
    const _id = router.query._id

    const [post, setPost] = useState({});

    useEffect(() => {
        if (_id) {
            fetchPost();
        }
    }, [_id]);

    const fetchPost = async () => {
        try {
            const { data } = await axios.get(`/user-post/${_id}`);
            setPost(data);
        } catch (error) {
            console.log(error)
        }
    }

    const removeComment = async (postId, comment) => {
        // console.log(postId, comment)
        let ans = window.confirm('sure ?');
        if (!ans) return;

        try {
            const { data } = await axios.put(`/remove-comment/`, { postId, comment });
            console.log(data, "from removed comments");
            fetchPost();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UserRoutes>
            <div className='row col-md-8 offset-md-2 mt-5'>
                <Post post={post} commentsCount={100} removeComment={removeComment} />
                {/* <Link href="/user/dashboard">
                <a className='d-flex justify-content-cneter p-5'> <RollbackOutlined /> </a>
            </Link> */}
            </div>
        </UserRoutes>
    )
}

export default PostComments


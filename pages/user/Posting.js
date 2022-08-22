import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import UserRoutes from '../../components/routes/UserRoutes';
import { UserContext } from '../../context'
import CreatePostForm from '../../components/forms/CreatePostForm'
import axios from 'axios';

import { toast } from 'react-toastify'
import PostList from '../../components/cards/PostList';
import Students from '../../components/cards/Students';
import Link from 'next/link';
import { Modal, Pagination } from 'antd'
import CommentForm from '../../components/forms/commentForm';
import Search from '../../components/Search';


const dashboard = ({ dash }) => {

    const [state, setState] = useContext(UserContext);
    const [content, setContent] = useState('');
    const [image, setImage] = useState({});
    const [loadingImage, setLoadingImage] = useState(false);
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const { asPath } = router;
    const posting = asPath === '/user/Posting' ? true : false;
    // console.log(setting, "frmo posting")

    const [people, setPeople] = useState([]);

    const [comment, setComment] = useState('');
    const [visible, setVisible] = useState(false);
    const [currentPost, setCurrentPost] = useState({});
    // setNewFeedPost

    // // pagination
    // const [total, setTotal] = useState(0);
    // const [page, setPage] = useState(1);


    useEffect(() => {
        if (state && state.token) {
            findPeoples();
            fetchNewsFeed();
        }
    }, [state && state.token,])



    const fetchNewsFeed = async () => {
        try {
            const { data } = await axios.get(`/news-feed/`);
            setPosts(data)

        } catch (error) {
            console.log(error)
        }
    }


    const findPeoples = async (x) => {
        try {
            const { data } = await axios.get(`/find-students`);
            setPeople(data);
        } catch (error) {
            // console.log(error);
        }
    }


    const postSubmit = async (e) => {
        e.preventDefault();
        // console.log("post => ", content)


        try {
            const { data } = await axios.post(`/create-post`, {
                content, image
            }, { headers: { "Content-Type": "Application/json" } })
            // console.log(data)

            if (data.error) {
                toast.error(data.error)
            } else {
                fetchNewsFeed()
                toast.success('Post has been created !!')
                setContent('')
                setImage({})
            }

        } catch (err) {
            console.log(err)
        }
    }


    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData()

        formData.append('image', file);
        // formData.append('content', content);
        // console.log([...formData])
        setLoadingImage(true)

        try {
            const { data } = await axios.post('/upload-image', formData)
            // console.log('uploaded image data', data)
            setImage({
                url: data.url,
                public_id: data.public_id
            })
            fetchNewsFeed();
            setLoadingImage(false);

        } catch (error) {
            console.log(error)
            setLoadingImage(false)
        }
    }

    const handleDelete = async (post) => {

        try {

            let ans = window.confirm('are you sure ?')
            if (!ans) {
                return;
            } else {
                const { data } = await axios.delete(`/delete-post/${post._id}`)
                toast.success('Post has been delete')
                fetchNewsFeed();
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleFollow = async (user) => {
        // console.log(user, "following")

        try {

            const { data } = await axios.put(`/user-follow`, { _id: user._id })
            // console.log(data, 'handle follow response');

            // update localstrorage, keep toeken, update user
            let auths = JSON.parse(window.localStorage.getItem('auth'));
            auths.user = data;

            localStorage.setItem('auth', JSON.stringify(auths));

            // update state,
            setState({ ...state, user: data });

            // update stuudents state,
            let filtered = people.filter(i => i._id !== user._id);
            setPeople(filtered);

            // re render the postt in news feed
            fetchNewsFeed()
            toast.success(`following ${user.name}`)

        } catch (error) {
            console.log(error)
        }
    }


    const handleLike = async (_id) => {
        // console.log("like", _id)
        try {

            const { data } = await axios.put(`/like-post`, { _id });
            // console.log(data, "like data")
            fetchNewsFeed()

        } catch (error) {
            console.log(error)
        }
    }


    const handleUnlike = async (_id) => {
        // console.log("like", _id)
        try {
            const { data } = await axios.put(`/unlike-post`, { _id })
            // console.log(data, "unlike data")
            fetchNewsFeed()


        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = (post) => {
        setCurrentPost(post);
        setVisible(true)
    };

    const addComment = async (e) => {
        e.preventDefault();
        // console.log(currentPost._id, "comment post id")
        // console.log(comment, 'comment gooiung to be saved')

        try {
            const { data } = await axios.put('/add-comment', { postId: currentPost._id, comment })
            console.log(data)
            setComment('');
            setVisible(false);
            fetchNewsFeed();


        } catch (error) {
            console.log(error)
        }


    }

    const removeComment = async () => { }
    const handleReport = async (post) => {
        try {
            console.log(post, "from report post")
            let ans = window.confirm('are you sure ?')
            if (!ans) {
                return;
            } else {
                const { data } = await axios.put(`/report-post/${post._id}`)
                toast.success('Post has been reported');
                fetchNewsFeed();
                console.log(data);
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <UserRoutes>
            <div className='container' >
                <div className='row py-3'>
                    <div className={`col-md-8 ${dash && `offset-md-3`}`}>
                        {
                            state && state.user && state.user.isConfirmed === 'confirmed' &&
                            <CreatePostForm
                                postSubmit={postSubmit}
                                content={content}
                                setContent={setContent}
                                handleImage={handleImage}
                                loadingImage={loadingImage}
                                image={image}
                            />
                        }
                        {
                            state && state.user && state.user.isConfirmed === 'requested' &&
                            <div className='row bbg-danger'>
                                <div className='col-12'>
                                    <button className='btn btn-secondary btn-block ' disabled>
                                        Your request has been send to the admin
                                    </button>
                                </div>

                            </div>
                        }
                        <br />
                        <PostList handleReport={handleReport} handleComment={handleComment} addComment={addComment} removeComment={removeComment} posts={posts} handleLike={handleLike} handleUnlike={handleUnlike} handleDelete={handleDelete} />
                    </div>

                    {
                        posting && <div className='col-md-4'>
                            <Search />
                            <br />
                            {state && state.user && state.user.following && <Link href={'/user/following'} >
                                <a className='h6'> {
                                    state.user.following.length
                                } Following</a>
                            </Link>}
                            <Students handleFollow={handleFollow} stu={people} />
                        </div>
                    }
                </div>

                <Modal
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    title="Comment"
                    footer={null}
                >
                    <CommentForm
                        addComment={addComment}
                        comment={comment}
                        setComment={setComment}
                    />
                </Modal>

            </div>
        </UserRoutes>
    )
}

export default dashboard
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import renderHTML from 'react-render-html';
import { toast } from 'react-toastify';
import AdminRoutes from '../../components/routes/AdminRoutes';
import { UserContext } from '../../context';

const AllPosts = () => {
    const [state, setState] = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    // // pagination
    // const [total, setTotal] = useState(0);
    // const [page, setPage] = useState(1);


    useEffect(() => {
        if (state && state.token) {
            fetchNewsFeed();
        }
    }, [state && state.token,])


    const fetchNewsFeed = async () => {
        try {
            const { data } = await axios.get(`/posts`);
            // console.log(data)
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }



    const handleDelete = async (post) => {

        try {

            let ans = window.confirm('are you sure ?')
            if (!ans) {
                return;
            } else {
                const { data } = await axios.delete(`/admin/delete-post/${post._id}`)
                toast.success('Post has been delete')
                fetchNewsFeed();
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AdminRoutes>
            <div className='container py-5'>

                <h2 className='py-2 text-dark'> List Of All Posts </h2>
                <hr />
                <div class="table-responsive">
                    <table class="table table-dark">
                        <thead class="">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">_id</th>
                                <th scope="col">Content</th>
                                <th scope="col">Likes</th>
                                <th scope="col">Comments</th>
                                <th scope="col">Create At</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts && posts.map((x, index) => <tr key={x._id}>
                                    <th scope="row"> {index++}</th>
                                    <td>{x._id}</td>
                                    <td>{renderHTML(x.content)}</td>
                                    <td>{x.likes.length}</td>
                                    <td>{x.comments.length}</td>
                                    <td>{moment(x.createdAt).fromNow()}</td>
                                    <td onClick={() => deleteHandler(x)} className="text-danger" >delete</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminRoutes>
    )
}

export default AllPosts
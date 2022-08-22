import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import AdminRoutes from '../../components/routes/AdminRoutes'
import { UserContext } from '../../context'

import renderHTML from 'react-render-html'
import { toast } from 'react-toastify'

const ReportPosts = () => {

    const [state] = useContext(UserContext);
    const [reportedPosts, setReportedPosts] = useState([])


    useEffect(() => {
        if (state && state.user) {
            gettingAllReportedPosts();
        }
    }, [state && state.user])

    const gettingAllReportedPosts = async () => {
        try {
            const { data } = await axios.get(`/all-report-posts`);
            setReportedPosts(data);
        } catch (error) {
            console.log(error)
        }
    }
    const deleteHandler = async (post) => {

        try {

            let ans = window.confirm('are you sure ?')
            if (!ans) {
                return;
            } else {
                const { data } = await axios.delete(`/delete-post/${post._id}`)
                toast.error('Post has been delete')
                gettingAllReportedPosts();
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AdminRoutes>
            <div className='container py-5'>

                <h2 className='py-2 text-dark'> List Of All Reported Posts </h2>
                <hr />
                {/* {JSON.stringify(reportedPosts)} */}
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
                                reportedPosts && reportedPosts.map((x, index) => <tr key={x._id}>
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

export default ReportPosts
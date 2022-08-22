import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context'
import axios from 'axios';

import { toast } from 'react-toastify'
import AdminRoutes from '../../components/routes/AdminRoutes';
import renderHTML from 'react-render-html'
import moment from 'moment';

const Admin = () => {

    const [state, setState] = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [lastWeekPosts, setLastWeekPosts] = useState(0);
    const [blockedUseres, setBlockedUsers] = useState(0);
    const [requestedUsers, setRequestedUsers] = useState(0);
    const [lastWeekReportedPosts, setLastWeekReportedPosts] = useState(0);
    const router = useRouter();

    // // pagination
    // const [total, setTotal] = useState(0);
    // const [page, setPage] = useState(1);


    useEffect(() => {
        if (state && state.token) {
            lastWeek();
        }
    }, [state && state.token,])

    const lastWeek = async () => {
        try {
            const total_posts = await axios.get(`/posts`);
            const last_week_posts = await axios.get(`/last-week/posts`);
            const last_week_reported_posts = await axios.get(`/last-week/reported/posts`);
            const last_week_requested_users = await axios.get(`/last-week/requested/users`);
            const last_week_blocked_users = await axios.get(`/last-week/blocked/users`);

            setPosts(total_posts.data)
            setLastWeekPosts(last_week_posts.data)
            setLastWeekReportedPosts(last_week_reported_posts.data)
            setRequestedUsers(last_week_requested_users.data)
            setBlockedUsers(last_week_blocked_users.data)
        } catch (error) {
            console.log(error)
        }
    }
    let Countlikes = 0;
    let CountComments = 0;
    if (posts.length > 0) {

        posts.forEach(post => {
            Countlikes += post.likes.length
            CountComments += post.likes.length
        });

    }


    return (
        <AdminRoutes>
            <div className='container' >
                <h2 className='py-2 text-dark'> Statistic </h2>
                <hr className='text-dark' />

                <div className='row py-4 my-5 bg-dark' style={{ borderRadius: "10px" }}>
                    <div className='col  text-center font-weight-bold'>
                        <h1 style={{ fontSize: "5rem" }} className="text-primary">
                            {lastWeekPosts}
                        </h1>
                        <small className="text-muted" > Last Week Posts </small>
                    </div>
                    <div className='col  text-center font-weight-bold '>
                        <h1 style={{ fontSize: "5rem" }} className="text-danger">
                            {lastWeekReportedPosts}
                        </h1>
                        <small className="text-muted" > Last Week Reported Posts </small>
                    </div>
                </div>

                <div className='row py-4 my-5 bg-dark' style={{ borderRadius: "10px" }}>
                    <div className='col  text-center font-weight-bold'>
                        <h1 style={{ fontSize: "5rem" }} className="text-success">
                            {Countlikes}
                        </h1>
                        <small className="text-muted" > Total Likes </small>
                    </div>
                    <div className='col  text-center font-weight-bold '>
                        <h1 style={{ fontSize: "5rem" }} className="text-warning">
                            {CountComments}
                        </h1>
                        <small className="text-muted" > Total Comments </small>
                    </div>
                </div>


                <div className='row py-4 bg-dark' style={{ borderRadius: "10px" }}>
                    <div className='col  text-center font-weight-bold'>
                        <h1 style={{ fontSize: "5rem" }} className="text-danger">
                            {blockedUseres}
                        </h1>
                        <small className="text-muted" > Blocked Users </small>
                    </div>
                    <div className='col  text-center font-weight-bold '>
                        <h1 style={{ fontSize: "5rem" }} className="text-primary">
                            {requestedUsers}
                        </h1>
                        <small className="text-muted" > Requested Users </small>
                    </div>
                </div>



            </div>
        </AdminRoutes>
    )
}

export default Admin
import { Avatar } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useState, useEffect } from 'react'
import UserRoutes from '../../components/routes/UserRoutes';
import { UserContext } from '../../context'
import Posting from './Posting'

const dashboard = () => {

    const [user, setUser] = useState({});
    const [state] = useContext(UserContext);

    useEffect(() => {
        if (state && state.user)
            fetchUser()
    }, [state && state.user])

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`/user/${state.user.username}`);
            // console.log(data);
            setUser(data);
        } catch (error) {
            console.log(error)
        }
    }


    const ImageSrc = (user) => {
        if (user.image) {
            return <Avatar size={150} src={user.image.url} alt="img" />
        } else {
            return <Avatar size={150} src="/images/avatar.png" />
        }
    }

    return (
        <UserRoutes>
            <div className='container-fluid'>
                <div className='row py-3'>
                    {
                        user &&
                        <div className="card mb-3" >
                            <div className="row g-0">
                                <div className="col-md-3 d-flex justify-content-center align-items-center">
                                    {/* <img src="..." className="img-fluid rounded-start" alt="..." /> */}
                                    {/* <Avatar src={ImageSrc(user)}  /> */}
                                    <ImageSrc user={user} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title text-capitalize">{user.name}</h5>
                                        <small className="text-muted">{state.user.username}</small>
                                        <hr />
                                        <p className="card-text">
                                            {user.department}
                                        </p>
                                        <p className="card-text">
                                            {user.about}
                                        </p>
                                        <hr />
                                        <span className='text-dark font-weight-bold mr-5'> {user.followers && user.followers.length} Followers </span>
                                        <span className='text-secondary font-weight-normal'> {user.following && user.following.length} Following </span>
                                        <br />
                                        <span className='text-dark font-weight-bold mr-5'> Github </span>
                                        <span className='text-dark font-weight-bold mr-5'> linkedIn </span>
                                        <span className='text-dark font-weight-bold mr-5'> Instagram </span>


                                        <p className="card-text">
                                            <small className="text-muted">Joined {moment(user.createdAt).fromNow()}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <Posting dash={true} />
            </div>
        </UserRoutes>
    )
}

export default dashboard
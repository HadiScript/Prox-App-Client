import { Avatar } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import UserRoutes from '../../../components/routes/UserRoutes';
import { UserContext } from '../../../context';

const ProfileList = () => {

    const [users, setUsers] = useState([]);
    const [state] = useContext(UserContext);

    useEffect(() => {
        if (state && state.user)
            fetchingAllUsers()
    }, [state && state.user])

    const fetchingAllUsers = async () => {
        try {
            const { data } = await axios.get(`/users`);
            console.log(data, "from all users");
            setUsers(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UserRoutes>


            <div className='container-fluid py-5'>
                {
                    users && users.map(user => <div key={user._id} className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-3 d-flex justify-content-center align-items-center">
                                {/* <img src="..." className="img-fluid rounded-start" alt="..." /> */}
                                {/* <Avatar src={ImageSrc(user)}  /> */}
                                {/* <ImageSrc user={user} /> */}
                                {
                                    user.image
                                        ?
                                        <Avatar size={150} src={user.image.url} alt="img" />
                                        :
                                        <Avatar size={150} src="/images/avatar.png" />
                                }
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title text-capitalize">{user.name}</h5>
                                    <small className="text-muted">{user.username}</small>
                                    <hr />
                                    <p className="card-text">
                                        {user.department}
                                    </p>
                                    <p className="card-text">
                                        {user.about}
                                    </p>
                                    <hr />
                                    <span classNameName='text-dark font-weight-bold mr-5'> {user.followers && user.followers.length} Followers </span>
                                    <span classNameName='text-secondary font-weight-normal'> {user.following && user.following.length} Following </span>
                                    <br />
                                    <span classNameName='text-dark font-weight-bold mr-5'> Github </span>
                                    <span classNameName='text-dark font-weight-bold mr-5'> linkedIn </span>
                                    <span classNameName='text-dark font-weight-bold mr-5'> Instagram </span>


                                    <p className="card-text">
                                        <small className="text-muted">Joined {moment(user.createdAt).fromNow()}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </UserRoutes>
    )
}

export default ProfileList
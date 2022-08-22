import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context'
import { Avatar, Card } from 'antd'
import axios from 'axios'
import { RollbackOutlined } from '@ant-design/icons'
import Link from 'next/link'
import UserRoutes from '../../components/routes/UserRoutes'


const UserName = () => {

    const [state, setState] = useContext(UserContext);
    // people
    const [user, setUser] = useState({});

    const router = useRouter();

    const ImageSrc = (user) => {
        if (user.image) {
            return <Avatar size={40} src={user.image.url} alt="img" />
        } else {
            return <Avatar size={40}  > {user.name} </Avatar>
        }
    }


    useEffect(() => {
        if (router.query.username)
            fetchUser()
    }, [router.query.username])

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`/user/${router.query.username}`);
            // console.log(data);
            setUser(data);
        } catch (error) {
            console.log(error)
        }
    }

    const { Meta } = Card

    return (
        <UserRoutes>
            <Link href={'/user/dashboard'}>
                <a classNameName='d-flex justify-content-center'> <RollbackOutlined classNameName='' /> </a>
            </Link>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="card p-4"> <div className=" image d-flex flex-column justify-content-center align-items-center">
                    <button className="btn btn-secondary">
                        <img src={user.image} height="100" width="100" />
                        {/* <ImageSrc user={user} /> */}
                    </button>
                    <span className="name mt-3 text-dard font-weight-bold">{user.name}</span>
                    <span className="idd text-secondary">@{user.username}</span>
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                        <span className="idd1 text-dard font-weight-bold">department : {user.department ? user.department : "Computer Science"}</span>
                    </div>
                    <div className="d-flex justify-content-between bg-danger mt-3">
                        <span classNameName='number text-secondary pr-5'> {user.followers && user.followers.length} Followers </span>
                        <span classNameName='number text-secondary'> {user.following && user.following.length} Following </span>
                        {/* <span className="number">1069 <span className="follow">Followers</span></span> */}
                    </div>
                    <div className="text mt-3 ">
                        {user.about}
                    </div>
                    <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                        <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span>
                        <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span>
                    </div>
                    <div className=" px-2 rounded mt-4 date ">
                        <span className="idd1 text-secondary">Joined {moment(user.createdAt).fromNow()}</span>
                    </div>
                </div>

                </div>
            </div >

        </UserRoutes>
    )
}

export default UserName
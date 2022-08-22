import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context'
import { Avatar, List } from 'antd'
import axios from 'axios'
import { RollbackOutlined } from '@ant-design/icons'
import Link from 'next/link'
import UserRoutes from '../../components/routes/UserRoutes'

const Following = () => {

    const [state, setState] = useContext(UserContext);
    // people
    const [people, setPeople] = useState([]);

    const router = useRouter();

    const imageSrc = (user) => {
        if (user.image) {
            return <Avatar size={40} src={user.image.url} alt="img" />
        } else {
            return <Avatar size={40}  > {user.name[0]} </Avatar>
        }
    }

    useEffect(() => {
        if (state && state.token)
            fetchFollowing()
    }, [state && state.token])

    const fetchFollowing = async () => {
        try {
            const { data } = await axios.get(`user-following`);
            // console.log(data);
            setPeople(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnFollow = async (user) => {
        try {
            const { data } = await axios.put(`user-unfollow`, { _id: user._id })
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

            toast.success(`unfollowed ${user.name}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UserRoutes >

            <div className='row  col-md-6 offset-md-3'>
                <List itemLayout='horizontal' dataSource={people} renderItem={(x) => (
                    <List.Item key={x._id} >
                        <List.Item.Meta onClick={() => handleUnFollow(x)} avatar={imageSrc(x)} description="Doc Idress" title={<div className='d-flex justify-content-between'>{x.name} <span className='text-primary pointer'> Unfollow </span> </div>} />
                    </List.Item>
                )} />
                <Link href={'/user/dashboard'}>
                    <a className='d-flex justify-content-center'> <RollbackOutlined className='' /> </a>
                </Link>
            </div>
        </UserRoutes>
    )
}

export default Following
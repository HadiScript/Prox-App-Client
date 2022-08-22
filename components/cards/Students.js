import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { UserContext } from '../../context'
import { Avatar, List } from 'antd'
import Link from 'next/link'

export const imageSrc = (user) => {
    if (user.image) {
        return <Avatar size={40} src={user.image.url} alt="img" />
    } else {
        return <Avatar size={40}  > {user.name[0]} </Avatar>
    }
}

const Students = ({ stu, handleFollow, handleUnfollow }) => {

    const [state] = useContext(UserContext);
    const router = useRouter();



    return (
        <>
            <List itemLayout='horizontal' dataSource={stu} renderItem={(x) => (
                <List.Item key={x._id} >
                    <List.Item.Meta avatar={imageSrc(x)} description="Doc Idress"
                        title={
                            <div className='d-flex justify-content-between'>
                                <Link href={`/user/${x.username}`}>
                                    <a>{x.name}</a>
                                </Link>
                                {
                                    state && state.user && x.followers && x.followers.includes(state.user._id) ? (
                                        <span onClick={() => handleUnfollow(x)} className='text-primary pointer'> Unfollow </span>
                                    ) : (
                                        <span onClick={() => handleFollow(x)} className='text-primary pointer'> Follow </span>
                                    )
                                }
                            </div>
                        }
                    />
                </List.Item>
            )} />
        </>
    )
}

export default Students
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AdminRoutes from '../../components/routes/AdminRoutes';
import { UserContext } from '../../context';
import { Avatar, List } from 'antd'

const Allusers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const [loadingConfrim, setLoadingConfrim] = useState(false);
    const [state] = useContext(UserContext)

    useEffect(() => {
        if (state && state.token) {
            fetchAllRequestedUsers()
        }
    }, [state && state.token]);

    const fetchAllRequestedUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/all-requested-users`);
            console.log(data, "from requested users")
            setLoading(false)
            setUsers(data);
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const imageSrc = (user) => {
        if (user.image) {
            return <Avatar size={40} src={user.image.url} alt="img" />
        } else {
            return <Avatar size={40}  > {user.name[0]} </Avatar>
        }
    }

    const handleConfirm = async (user) => {
        try {
            setLoadingConfrim(true);
            const { data } = await axios.put(`/admin/confirm-user/${user._id}`, {
                isConfirmed: "confirmed"
            })
            setLoadingConfrim(false)
            fetchAllRequestedUsers();
        } catch (error) {
            setLoadingConfrim(false)
            console.log(error)
        }
    }


    return (
        <AdminRoutes>
            {loading && <p> Loading... </p>}
            {loadingConfrim && <p> Loading... </p>}
            <div className='row  col-md-8 offset-md-2'>
                <h2 className='py-2 text-dark'> Requested Users </h2>
                <hr />
                <List itemLayout='horizontal' dataSource={users} renderItem={(x) => (
                    <List.Item key={x._id} >
                        <List.Item.Meta avatar={imageSrc(x)} description={x.username} title={<div className='d-flex justify-content-between'>{x.name} <span onClick={() => handleConfirm(x)} className='text-primary pointer'> Confrim  </span> </div>} />
                    </List.Item>
                )} />
            </div>

        </AdminRoutes>
    )
}

export default Allusers
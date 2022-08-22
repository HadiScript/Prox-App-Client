import { Modal, Table } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import PasswordFrom from '../../components/forms/PasswordFrom';
import AdminRoutes from '../../components/routes/AdminRoutes';
import { UserContext } from '../../context';



const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'department',
        dataIndex: 'department',
        key: 'department',
    },
    {
        title: 'Admin',
        dataIndex: 'Admin',
        key: 'Admin',
    },
];

const ListUsers = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const [state] = useContext(UserContext)
    const [visible, setVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [block, setBlock] = useState(false)


    useEffect(() => {
        if (state && state.token) {
            fetchtingAllUsers();
            setRole(currentUser.Role)
            setBlock(currentUser.Block)

        }
    }, [state && state.token]);


    const fetchtingAllUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/admin/all-user`);
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

    const handleEdit = (user) => {
        setCurrentUser(user);
        setVisible(true);
    }


    const submitHandler = async (e) => {
        // console.log(password, currentUser._id, "submiting")
        e.preventDefault();
        console.log('here am')
        try {
            const { data } = await axios.put('/admin/change-user-password',
                { _id: currentUser._id, password, Role: role, Block: block }
            )
            console.log(data)
            setPassword('');
            setBlock(false);
            setRole('');
            toast.success(`${currentUser.name} has been set!`)
            setVisible(false);
            fetchtingAllUsers();


        } catch (error) {
            console.log(error)
        }
    }
    // console.log("current user", currentUser)

    return (
        <AdminRoutes><div className='container py-5'>

            <h2 className='py-2 text-dark'> List Of All Users </h2>
            <hr />
            <div class="table-responsive">
                <table class="table table-dark">
                    <thead class="">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Department</th>
                            <th scope="col">Confirmed</th>
                            <th scope="col">Admin ?</th>
                            <th scope="col">Block ?</th>
                            <th scope="col"></th>
                            <th scope="col">Change Password</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            loading && <p> Loading... </p>
                        }
                        {
                            users && users.map((x, index) => <tr key={x._id}>
                                <th scope="row"> {index++}</th>
                                <td>{x.name}</td>
                                <td>{x.email}</td>
                                <td>{x.department ? x.department : '-'}</td>
                                <td>{x.isConfirmed === 'requested' ? 'Not Confirm' : 'Confirmed'}</td>
                                <td onClick={() => handleEdit(x)} >{x.Role === 'Admin' ? "Admin" : 'Not Admin'}</td>
                                <td onClick={() => handleEdit(x)} >{x.Block ? 'Yes' : 'No'}</td>
                                <td></td>
                                <td onClick={() => handleEdit(x)} >Edit</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                title="Set User"
                footer={null}
            >
                <PasswordFrom
                    page="userslist"
                    password={password}
                    setPassword={setPassword}
                    submitHandler={submitHandler}
                    setBlock={setBlock}
                    setRole={setRole}
                    block={block}
                    role={role}
                />
            </Modal>
        </div >
        </AdminRoutes>
    )
}

export default ListUsers
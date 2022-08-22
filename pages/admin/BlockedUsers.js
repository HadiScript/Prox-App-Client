// BlockedUsers
import { Modal } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import PasswordFrom from '../../components/forms/PasswordFrom';
import AdminRoutes from '../../components/routes/AdminRoutes';
import { UserContext } from '../../context';


const BlockedUsers = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false);
  const [state] = useContext(UserContext)
  const [visible, setVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [block, setBlock] = useState(false)


  useEffect(() => {
    if (state && state.token) {
      fetchtingAllBlockedUsers();
      setBlock(currentUser.Block)

    }
  }, [state && state.token]);


  const fetchtingAllBlockedUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/all-blocked-user`);
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
        { _id: currentUser._id, Block: block }
      )
      console.log(data)
      setBlock(false);
      toast.success(`${currentUser.name} has Unblock!`)
      setVisible(false);
      fetchtingAllBlockedUsers();


    } catch (error) {
      console.log(error)
    }
  }
  // console.log("current user", currentUser)

  return (
    <AdminRoutes>

      <div className='container py-5'>

        <h2 className='py-2 text-dark'> List Of All Blocked Users </h2>
        <hr />
        <div class="table-responsive">
          <table class="table table-dark">
            <thead class="">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Block ?</th>
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
                  <td onClick={() => handleEdit(x)} >{x.Block ? 'Yes' : 'No'}</td>
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
            page="blockedUsers"
            submitHandler={submitHandler}
            setBlock={setBlock}
            block={block}
          />
        </Modal>
      </div >
    </AdminRoutes>
  )
}

export default BlockedUsers
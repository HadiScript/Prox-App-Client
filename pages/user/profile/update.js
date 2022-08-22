import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Modal } from 'antd'
import Link from 'next/link';
import AuthForm from '../../../components/forms/AuthForm';
import { UserContext } from '../../../context';
import { useRouter } from 'next/router';
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar } from 'antd'
import UserRoutes from '../../../components/routes/UserRoutes';


const PorfileUpdate = () => {

    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [about, setAbout] = useState('');

    const [image, setImage] = useState('');
    const [imageLoading, setImageLoading] = useState(false);


    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [secret, setsecret] = useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        if (state && state.user) {
            setUsername(state.user.username)
            setAbout(state.user.about)
            setname(state.user.name)
            setemail(state.user.email)
            setImage(state.user.image)
        }

    }, [state && state.user])


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const { data } = await axios.put(`/update-profile`, {
                name, email, password, secret, username, about, image
            }, { headers: { "Content-Type": "Application/json" } })
            console.log(data)
            if (data.error) {
                toast.error(data.error)
                setLoading(false)
            }
            else {
                // console.log('updated res', data)


                // updating localstorage & update user & keep token
                let auths = JSON.parse(window.localStorage.getItem('auth'));
                auths.user = data;

                localStorage.setItem('auth', JSON.stringify(auths));

                // update context
                setState({ ...state, user: data });

                setOk(true)
                setLoading(false)
                toast.success("Updated :)")

            }

        } catch (err) {
            console.log(err)
            // toast.error(err.response.data)
            setLoading(false)
        }
    }

    // if (state && state.token) {
    //     router.push('/')
    // }
    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData()

        formData.append('image', file);
        setImageLoading(true)

        try {
            const { data } = await axios.post('/upload-image', formData)
            // console.log('uploaded image data', data)
            setImage({
                url: data.url,
                public_id: data.public_id
            })
            setImageLoading(false)

        } catch (error) {
            console.log(error)
            setImageLoading(false)
        }
    }

    return (
        <UserRoutes >


            <div className='container-fluid pt-3'>
                <h2 className='py-2 text-dark'> Update Profile </h2>
                <hr />

                <div className='row py-5 '>
                    <div className='col d-flex align-items-center justify-content-center'>
                        {/* upload image */}
                        <label className='d-flex justify-content-center h5' >
                            {image
                                &&
                                image.url
                                ?
                                <Avatar size={200} src={image.url} className="mt-1" />
                                : imageLoading
                                    ? <LoadingOutlined className='mt-1' />
                                    :
                                    <CameraOutlined className='mt-1' style={{ fontSize: "100px" }} />}



                            <input onChange={handleImage} type='file' accept='images/*' hidden />

                        </label>
                    </div>
                    <div className='col'>




                        <AuthForm
                            setname={setname}
                            username={username}
                            setUsername={setUsername}
                            about={about}
                            setAbout={setAbout}

                            page="profile"

                            name={name}
                            setemail={setemail}
                            email={email}
                            setpassword={setpassword}
                            password={password}
                            setsecret={setsecret}
                            secret={secret}
                            loading={loading}
                            submitHandler={submitHandler}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        {/* <Modal
                            title="Registered"
                            visible={ok}
                            onCancel={() => setOk(ok)}
                            footer={null}
                        >
                            <p>
                                Update Profile
                            </p>

                        </Modal> */}
                    </div>
                </div>



            </div>
        </UserRoutes>
    )
}

export default PorfileUpdate
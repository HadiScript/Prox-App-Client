import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { Modal } from 'antd'
import Link from 'next/link';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import { UserContext } from '../context';
import { useRouter } from 'next/router';

const ForgotPassword = () => {

    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    const [email, setemail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [secret, setsecret] = useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const { data } = await axios.post(`/forgot-password`, {
                email, newPassword, secret
            }, { headers: { "Content-Type": "Application/json" } })

            console.log("forgot data", data);

            if (data.error) {
                toast.error(data.error);
                setLoading(false);
            }

            else {
                setname('')
                setemail('')
                setNewPassword('')
                setsecret('')
                setOk(true)
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            // toast.error(err.response.data)
            setLoading(false)
        }
    }

    if (state && state.token) {
        router.push('/')
    }


    return (
        <div className='container-fluid'>
            <div className='row py-5  text-light bg-default-image'>
                <div className='col text-center'><h2>ForgotPassword</h2></div>
            </div>

            <div className='row py-5 '>
                <div className='col-md-6 offset-md-3'>
                    <ForgotPasswordForm
                        email={email}
                        setemail={setemail}
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        secret={secret}
                        setsecret={setsecret}
                        loading={loading}
                        submitHandler={submitHandler}

                    />
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <Modal
                        title="Password"
                        visible={ok}
                        onCancel={() => setOk(ok)}
                        footer={null}
                    >
                        <p>
                            You can now login with new password
                        </p>
                        <Link href="/login">
                            <a className='btn btn-primary btn-sm'> Login </a>
                        </Link>
                    </Modal>
                </div>
            </div>


        </div>
    )
}

export default ForgotPassword
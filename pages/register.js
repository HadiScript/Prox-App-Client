import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { Modal } from 'antd'
import Link from 'next/link';
import AuthForm from '../components/forms/AuthForm';
import { UserContext } from '../context';
import { useRouter } from 'next/router';

const Register = () => {

    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [secret, setsecret] = useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const { data } = await axios.post(`/register`, {
                name, email, password, secret
            }, { headers: { "Content-Type": "Application/json" } })
            console.log(data)
            if (data.error) {
                toast.error(data.error)
                setLoading(false)
            }
            else {
                setname('')
                setemail('')
                setpassword('')
                setsecret('')
                setOk(data.ok)
                setLoading(false)
            }

        } catch (err) {
            console.log(err)
            // toast.error(err.response.data)
            setLoading(false)
        }
    }

    if (state && state.token) {
        router.push('/user/dashboard')
    }


    return (<>

        <div className='container-fluid'>
            <div className='row py-5 '>
                <div className='col-md-6 offset-md-3'>
                    <h2 className='py-2 text-dark'> Register </h2>
                    <hr />
                    <AuthForm
                        setname={setname}
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
                    <Modal
                        title="Registered"
                        visible={ok}
                        onCancel={() => setOk(ok)}
                        footer={null}
                    >
                        <p>
                            You have succesfully register
                        </p>
                        <Link href="/login">
                            <a className='btn btn-primary btn-sm'> Login </a>
                        </Link>
                    </Modal>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <p className='text-center'>
                        Already Register ?  <Link href="/login">
                            <a className='btn-sm'> Login </a>
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    </>
    )
}

export default Register
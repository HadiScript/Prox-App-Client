import { UserContext } from '../context'

import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import Link from 'next/link';
import AuthForm from '../components/forms/AuthForm';

import { useRouter } from 'next/router'

const Login = () => {

    const [state, setState] = useContext(UserContext)

    const router = useRouter();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setLoading] = useState(false);


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const { data } = await axios.post(`/login`, {
                email, password,
            }, { headers: { "Content-Type": "Application/json" } })
            console.log(data)
            if (data.error) {
                toast.error(data.error)
                setLoading(false)
            }
            else {
                // save in context
                setState({
                    user: data.user,
                    token: data.token
                });

                window.localStorage.setItem('auth', JSON.stringify(data));
                router.push('/user/dashboard')
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

    return (
        <div className='container-fluid'>

            <div className='row py-5 '>
                <div className='col-md-6 offset-md-3'>
                    <h2 className='py-2 text-dark'> Login </h2>
                    <hr />
                    <AuthForm
                        setemail={setemail}
                        email={email}
                        setpassword={setpassword}
                        password={password}
                        loading={loading}
                        submitHandler={submitHandler}
                        page="login"
                    />
                </div>
            </div>


            <div className='row'>
                <div className='col'>
                    <p className='text-center'>
                        Not yet register ?  <Link href="/register">
                            <a className='btn-sm'> Register </a>
                        </Link>
                    </p>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <p className='text-center'>
                        <Link href="/forgot-password">
                            <a className='btn-sm text-danger'> Forgot password ? </a>
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Login
import React from 'react'
import { SyncOutlined } from '@ant-design/icons'

const AuthForm = ({ page, username, setUsername, about, setAbout, submitHandler, name, setname, email, setemail, password, setpassword, secret, setsecret, loading }) => {
    return (
        <form onSubmit={submitHandler}>


            {
                page !== 'login' && page !== 'password' && <div className='form-group p-2'>
                    <small> <label className='text-muted'> Your Name </label></small>
                    <input onChange={e => setname(e.target.value)} value={name} type="text" className='form-control' placeholder='Enter name' />
                </div>
            }


            {
                page === 'profile' && <div className='form-group p-2'>
                    <small> <label className='text-muted'> User Name </label></small>
                    <input onChange={e => setUsername(e.target.value)} value={username} type="text" className='form-control' placeholder='Enter user name' />
                </div>
            }

            {
                page === 'profile' && <div className='form-group p-2'>
                    <small> <label className='text-muted'> Your Name </label></small>
                    <textarea onChange={e => setAbout(e.target.value)} value={about} type="text" className='form-control' placeholder='Enter about your self' />
                </div>
            }

            {
                page !== 'password' && <div className='form-group p-2'>
                    <small> <label className='text-muted'> Your Email </label></small>
                    <input disabled={page === "profile" && true} onChange={e => setemail(e.target.value)} value={email} type="email" className='form-control' placeholder='Enter email address' />
                </div>
            }

            {
                page !== 'profile' &&
                <div className='form-group p-2'>
                    <small> <label className='text-muted'> Password </label></small>
                    <input onChange={e => setpassword(e.target.value)} value={password} type="password" className='form-control' placeholder='Enter password' />
                </div>
            }



            {
                page !== 'login' && page !== 'profile' && <div className='form-group p-2'>
                    <small> <label className='text-muted'> Pick a question </label></small>
                    <select className='form-control' >
                        <option className='' selected > What is your favourite color ? </option>
                        <option className=''  > What is your best friend name ? </option>
                        <option className=''  > What is your city you ware born ? </option>
                    </select>

                    <small className='form-text text-muted'>
                        You can use this for reset your password
                    </small>
                </div>
            }

            {
                page === 'password' && <>
                    <div className='form-group p-2'>
                        <input onChange={e => setsecret(e.target.value)} value={secret} type="text" className='form-control' placeholder='Enter your anser here' />
                    </div>

                    <div className='form-group p-2'>
                        <button disabled={!password || !secret && true} className='btn btn-dark col-12' type='submit'>
                            {loading ? <SyncOutlined spin className="py-1" /> : "Change Password"}
                        </button>
                    </div>
                </>
            }

            {
                page !== 'login' && page !== "profile" && page !== 'password' && <>
                    <div className='form-group p-2'>
                        <input onChange={e => setsecret(e.target.value)} value={secret} type="text" className='form-control' placeholder='Enter your anser here' />
                    </div>


                    <div className='form-group p-2'>
                        <button disabled={!name || !email || !password || !secret && true} className='btn btn-dark col-12' type='submit'>
                            {loading ? <SyncOutlined spin className="py-1" /> : "Register"}
                        </button>
                    </div>
                </>
            }

            {
                page !== "login" && page === 'profile' &&
                <div className='form-group p-2'>
                    <button disabled={!name || !username && true} className='btn btn-dark col-12' type='submit'>
                        {loading ? <SyncOutlined spin className="py-1" /> : "Update"}
                    </button>
                </div>
            }

            {
                page !== "profile" && page === 'login' &&
                <div className='form-group p-2'>
                    <button disabled={!email || !password && true} className='btn btn-dark col-12' type='submit'>
                        {loading ? <SyncOutlined spin className="py-1" /> : "Login"}
                    </button>
                </div>
            }
        </form>
    )
}

export default AuthForm
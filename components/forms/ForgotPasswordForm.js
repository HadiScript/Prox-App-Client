import React from 'react'
import { SyncOutlined } from '@ant-design/icons'

const ForgotPasswordForm = ({
    newPassword,
    setNewPassword,
    secret,
    setsecret,
    loading,
    email,
    setemail,
    submitHandler

}) => {
    return (
        <form onSubmit={submitHandler} >


            <div className='form-group p-2'>
                <small> <label className='text-muted'> Your Email </label></small>
                <input onChange={e => setemail(e.target.value)} value={email} type="email" className='form-control' placeholder='Enter email address' />
            </div>

            <div className='form-group p-2'>
                <small> <label className='text-muted'> Password </label></small>
                <input onChange={e => setNewPassword(e.target.value)} value={newPassword} type="password" className='form-control' placeholder='Enter new password' />
            </div>



            <div className='form-group p-2'>
                <small> <label className='text-muted'> Pick a question </label></small>
                <select className='form-control' >
                    <option className='' selected > What is your favourite color ? </option>
                    <option className=''  > What is your best friend name ? </option>
                    <option className=''  > What is your city you ware born ? </option>
                </select>

                <small className='form-text text-muted'>
                    You can this for reset your password
                </small>
            </div>

            <div className='form-group p-2'>
                <input onChange={e => setsecret(e.target.value)} value={secret} type="text" className='form-control' placeholder='Enter your anser here' />
            </div>



            <div className='form-group p-2'>
                <button disabled={!email || !secret || !newPassword && true} className='btn btn-primary col-12' type='submit'>
                    {loading ? <SyncOutlined spin className="py-1" /> : "Forgot Password"}
                </button>
            </div>

        </form>
    )
}

export default ForgotPasswordForm
// UpdatePassword
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import AuthForm from '../../../components/forms/AuthForm';
import UserRoutes from '../../../components/routes/UserRoutes';
import { UserContext } from '../../../context';


const UpdatePassword = () => {

    const [state, setState] = useContext(UserContext);


    const [password, setpassword] = useState('');
    const [secret, setsecret] = useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);



    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const { data } = await axios.put(`/update-profile`, {
                password, secret
            }, { headers: { "Content-Type": "Application/json" } })
            toast.success('Password has been updated')
            console.log(data)
            if (data.error) {
                toast.error(data.error)
                setLoading(false)
            }
            else {
                let auths = JSON.parse(window.localStorage.getItem('auth'));
                auths.user = data;

                localStorage.setItem('auth', JSON.stringify(auths));
                setState({ ...state, user: data });

                setOk(true)
                setLoading(false)

            }

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    return (
        <UserRoutes>


            <div className='container-fluid pt-3'>
                <h2 className='py-2 text-dark'> Update Profile </h2>
                <hr />

                <div className='row py-5 '>
                    <div className='col-md-6 offset-md-3'>
                        <AuthForm

                            page="password"
                            setpassword={setpassword}
                            password={password}
                            setsecret={setsecret}
                            secret={secret}
                            loading={loading}
                            submitHandler={submitHandler}
                        />
                    </div>
                </div>
            </div>
        </UserRoutes>
    )
}

export default UpdatePassword
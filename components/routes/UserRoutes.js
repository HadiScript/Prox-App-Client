import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { SyncOutlined } from '@ant-design/icons'
import { UserContext } from '../../context';


const UserRoutes = ({ children }) => {

    const [state] = useContext(UserContext);
    const router = useRouter();
    const [ok, setOk] = useState(false);

    // useEffect(()=>{  },[])

    const getCurrentUser = async () => {
        try {

            const { data } = await axios.get(`/current-user`)
            if (data.ok) {
                setOk(true);
            }

        } catch (error) {
            console.log(error);
            router.push('/login')
        }
    }

    useEffect(() => {
        if (state && state.token) getCurrentUser()
    }, [state && state.token])


    process.browser && state === null && setTimeout(() => {
        getCurrentUser();
    }, 1000);

    return !ok ? <SyncOutlined
        spin
        className='d-flex justify-content-center display-1 text-primary p-5'
    />
        :
        <>
            ({children})
        </>
}

export default UserRoutes
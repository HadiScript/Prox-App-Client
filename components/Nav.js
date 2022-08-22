import React, { useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '../context'
import { useRouter } from 'next/router';

const Nav = () => {

    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    const logout = () => {
        window.localStorage.removeItem('auth');
        setState(null);
        router.push('/login')
    }

    return (

        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            {state && state.user && <a className="navbar-brand col-md-3 col-lg-2  px-3 fs-6 ml-4" href="#"> {state.user.name} </a>}
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="form-control form-control-dark bg-dark w-100 rounded-0 border-0" />
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">

                    {
                        state !== null && <a className="nav-link px-3 text-light" onClick={logout} > Logout </a>
                    }

                    {
                        state === null && <Link href={'/login'} >
                            <a className="nav-link px-3 text-light"> login </a>
                        </Link>

                    }
                </div>
            </div>
        </header>
    )
}

export default Nav
import Link from 'next/link'
import React, { useContext } from 'react'


import { UserContext } from '../context'
import { useRouter } from 'next/router';


const Sidebar = () => {

    const [state, setState] = useContext(UserContext);
    const router = useRouter();
    const logout = () => {
        window.localStorage.removeItem('auth');
        setState(null);
        router.push('/login')
    }

    return state && state.user && <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-3 sidebar-sticky">
            <ul className="nav flex-column">
                <li className="nav-item">

                    {/* common */}
                    {/* <Link href={'/'} className="nav-link active"  >
                            <a className="nav-link active"  > Home </a>
                        </Link> */}

                    {/* users */}


                    {/* admins */}
                    {
                        state && state.user && state.user.Role === 'Admin' &&
                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                            <span>Admin</span>
                            <a className="link-secondary" href="#" aria-label="Add a new report">
                                <span data-feather="plus-circle" className="align-text-bottom"></span>
                            </a>
                        </h6>
                    }

                    {
                        state && state.user && state.user.Role === 'Admin' &&
                        <li>
                            <Link href={'/admin'} >
                                <a className="nav-link">
                                    Admin
                                </a>
                            </Link>

                        </li>
                    }

                    {
                        state && state.user && state.user.Role === 'Admin' &&
                        <li>
                            <Link href={'/admin/ListUsers'} >
                                <a className="nav-link">
                                    All Users
                                </a>
                            </Link>

                        </li>
                    }


                    {
                        state && state.user && state.user.Role === 'Admin' &&
                        <li>
                            <Link href={'/admin/AllPosts'} >
                                <a className="nav-link">
                                    All Posts
                                </a>
                            </Link>

                        </li>
                    }

                    {
                        state && state.user && state.user.Role === 'Admin' &&
                        <li>
                            <Link href={'/admin/Allusers'} >
                                <a className="nav-link">
                                    Post Request
                                </a>
                            </Link>

                        </li>
                    }



                    {
                        state && state.user && state.user.Role === 'Admin' &&
                        <li>
                            <Link href={'/admin/BlockedUsers'} >
                                <a className="nav-link">
                                    Block Users
                                </a>
                            </Link>

                        </li>
                    }

                    {
                        state && state.user && state.user.Role === 'Admin' &&
                        <li>
                            <Link href={'/admin/ReportPosts'} >
                                <a className="nav-link">
                                    Reported Posts
                                </a>
                            </Link>

                        </li>
                    }

                    {
                        state && state.user && state.user.Role === 'Admin' &&
                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                            <span>Common</span>
                            <a className="link-secondary" href="#" aria-label="Add a new report">
                                <span data-feather="plus-circle" className="align-text-bottom"></span>
                            </a>
                        </h6>
                    }


                    {
                        state && state.user && <li>
                            <Link href={'/user/dashboard'} >
                                <a className="nav-link">
                                    Dashboard
                                </a>
                            </Link>

                        </li>
                    }
                    {
                        state && state.user &&
                        <li>
                            <Link href={'/user/Posting'} >
                                <a className="nav-link">
                                    Posts
                                </a>
                            </Link>

                        </li>}
                    {
                        state && state.user &&

                        <li>
                            <Link href={'/user/dashboard'} >
                                <a className="nav-link">
                                    Videos
                                </a>
                            </Link>

                        </li>
                    }
                    {
                        state && state.user &&

                        <li>
                            <Link className='nav-item' href={'/user/profile/profileList'}>
                                <a className="nav-link">
                                    Profiles
                                </a>
                            </Link>

                        </li>
                    }
                </li>
            </ul>

            {state && state.user && <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                <span>Settings</span>
                <a className="link-secondary" href="#" aria-label="Add a new report">
                    <span data-feather="plus-circle" className="align-text-bottom"></span>
                </a>
            </h6>}
            <ul className="nav flex-column mb-2">
                {
                    state && state.user &&
                    <li>
                        <Link className='nav-item' href={'/user/profile/update'}>
                            <a className="align-text-bottom nav-link">
                                Update Profile
                            </a>
                        </Link>

                    </li>
                }

                {
                    state && state.user &&
                    <li>
                        <Link className='nav-item' href={'/user/profile/updatePassword'}>
                            <a className="align-text-bottom nav-link">
                                Change Your Password
                            </a>
                        </Link>

                    </li>
                }

            </ul>


        </div>
    </nav >
}

export default Sidebar
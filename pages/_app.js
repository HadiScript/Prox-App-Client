import { UserProvider } from '../context'


import Head from 'next/head'

import "antd/dist/antd.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';


function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Head>
                <title> App By Hadi </title>
                <meta name='description' content='By hadiraza.com' />
                <link rel='stylesheet' href='/css/styles.css' />
                <link rel='stylesheet' href='/css/layout.css' />

            </Head>

            <Nav />
            <div className="container-fluid">
                <ToastContainer position="top-right" />
                <div className="row">
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Component {...pageProps} />
                    </main>
                </div>
            </div>
        </UserProvider>
    )
}

export default MyApp;
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import ParallaxBg from '../components/cards/ParallaxBg';
import Post from '../components/cards/Post';
import { UserContext } from '../context'
import Head from 'next/head'

import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
    reconnection: true
})

const Home = ({ posts }) => {

    const [state, setState] = useContext(UserContext);

    useEffect(() => {
        console.log('socket.io on join', socket)
    }, [])

    const head = () => (
        <Head>
            <title> Social App </title>
            <meta name='description' content='next app by hadiraza.com' />

            {/* for social media */}
            <meta property='og:description' content='next app by hadiraza.com' />

            <meta property='og:type' content='website' />
            <meta property='og:site_name' content='hadiraza' />
            <meta property='og:url' content='hadiraza.com' />

            {/* image */}
            <meta property='og:image:scure_url' content='http://hadiraza.com/images/banner_1.jpg' />

        </Head>
    )
    return (
        < >
            {head()}

            <ParallaxBg url="/images/banner_1.jpg" > Home </ParallaxBg>
            <div className='container'>
                <button className='btn btn-sm' onClick={() => socket.emit('send-message', "this is from hadiraza.com")}>
                    send message
                </button>
                <div className='row pt-5'>
                    {
                        posts.map(post => <div key={post._id} className='col-md-4'>
                            <Post post={post} />
                        </div>)
                    }

                </div>
            </div>
        </>
    )
}

// ssr
export async function getServerSideProps() {
    const { data } = await axios.get(`/posts`);
    // console.log(data, 'from SSR');
    return {
        props: {
            posts: data
        }
    }
}

export default Home
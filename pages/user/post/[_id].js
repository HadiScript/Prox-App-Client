import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CreatePostForm from '../../../components/forms/CreatePostForm';
import UserRoutes from '../../../components/routes/UserRoutes';


const PostByID = () => {

    const router = useRouter();
    const _id = router.query._id
    const [post, setPost] = useState({})
    const [loading, setloading] = useState(false)

    // for editing 
    const [content, setContent] = useState('');
    const [image, setImage] = useState({});
    const [loadingImage, setLoadingImage] = useState(false);
    // ends



    useEffect(() => {
        if (_id) fetchPost(_id);
    }, [_id])


    const fetchPost = async (x) => {

        try {
            setloading(true)
            const { data } = await axios.get(`user-post/${x}`);
            // console.log(data)
            setPost(data);
            setContent(data.content)
            setImage(data.image)
            setloading(false)
        } catch (error) {
            setloading(false)
            console.log(error)
        }
    }

    // update post submit
    const postSubmit = async (e) => {
        e.preventDefault();

        console.log('post updated', content, image);
        try {
            const { data } = await axios.put(`/update-post/${_id}`, { content, image });
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success('Post has been updated');
                router.push('/user/dashboard')
                // console.log(data, 'from updating post')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // handling the image

    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData()

        formData.append('image', file);
        // formData.append('content', content);
        // console.log([...formData])
        setLoadingImage(true)

        try {
            const { data } = await axios.post('/upload-image', formData)
            console.log('uploaded image data', data)
            setImage({
                url: data.url,
                public_id: data.public_id
            })
            setLoadingImage(false)

        } catch (error) {
            console.log(error)
            setLoadingImage(false)
        }
    }


    return (
        <UserRoutes>
            <div className='container' >
                <div className='row'>
                    <div className='col'>
                        <h3 className='text-center py-5' >news feed</h3>

                    </div>
                </div>


                <div className='row py-3'>
                    <div className='col-md-8 offset-md-2'>
                        <CreatePostForm
                            postSubmit={postSubmit}
                            content={content}
                            setContent={setContent}
                            handleImage={handleImage}
                            loadingImage={loadingImage}
                            image={image}
                        />
                        <br />
                    </div>

                </div>
            </div>
        </UserRoutes>
    )
}

export default PostByID
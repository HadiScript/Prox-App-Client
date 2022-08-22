import React, { useContext } from 'react'
// import { Avatar } from 'antd'
// import moment from 'moment'
import Link from 'next/link'
import { imageSrc } from './Students'
import reactHtml from 'react-render-html'
import moment from 'moment'
import { Avatar } from 'antd'
import renderHTML from 'react-render-html'
import { CommentOutlined, DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined, } from '@ant-design/icons'
import PostImage from '../images/PostImage'

import { UserContext } from '../../context'
import { useRouter } from 'next/router'


const Post = ({
    post,
    handleReport,
    handleDelete,
    handleLike,
    handleUnlike,
    handleComment,
    commentsCount = 2,
    removeComment
}) => {
    const [state] = useContext(UserContext);
    const router = useRouter();
    return (
        <>
            {
                post && post.postedBy && <>
                    <div className='card mb-5' key={post._id}>
                        <div className='card-header d-flex justify-content-between align-items-center'>


                            {/* {
                                post && post.postedBy.image ?
                                    <Avatar size={40} src={post.postedBy.image.url} alt="img" />
                                    :
                                    <Avatar size={40}  > {post.postedBy} </Avatar>

                            } */}
                            <div>
                                <span className='pt-2 ml-3' style={{ marginLeft: '1rem' }} >{post.postedBy.name}</span>
                                <span className='ml-3 text-muted' style={{ marginLeft: '1rem' }} >{moment(post.createdAt).fromNow()}  </span>
                            </div>
                            <div>

                                {
                                    state && state.user && (
                                        <>
                                            <small onClick={() => handleReport(post)} className='text-danger' >report</small>
                                        </>
                                    )
                                }
                            </div>

                        </div>
                        <div className='card-body'>
                            {
                                renderHTML(post.content)
                            }
                        </div>
                        <div className='card-footer'>
                            {/* <img width='100%' height='100%' src={post.image && post.image.url} alt={post.postedBy.name} /> */}
                            {
                                post.image && <PostImage url={post.image.url} />
                            }
                            <div className='d-flex pt-2'>

                                {
                                    state && state.user && post.likes && post.likes.includes(state.user._id)
                                        ?
                                        (<HeartFilled onClick={() => handleUnlike(post._id)} className='text-danger pt-2 h5 px-2' />)
                                        :
                                        (<HeartOutlined onClick={() => handleLike(post._id)} className='text-danger pt-2 h5 px-2' />)
                                }
                                <div className='pt-2 pl-3' style={{ marginRight: '1rem' }} > {post.likes.length} </div>

                                <CommentOutlined onClick={() => handleComment(post)} className='text-danger pt-2 h5 px-2' />
                                <div className='pt-2 pl-3' >
                                    <Link href={`/post/${post._id}`}>
                                        <a>
                                            {post.comments.length} comment
                                        </a>
                                    </Link>
                                </div>



                                {
                                    state && state.user._id === post.postedBy._id && (
                                        <>
                                            <EditOutlined onClick={() => router.push(`/user/post/${post._id}`)} className='text-danger pt-2 h5 px-2 mx-auto' />
                                            <DeleteOutlined onClick={() => handleDelete(post)} className='text-danger pt-2 h5 px-2 ' />
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        {/* comments list just 2 0r 3 */}
                        {
                            post.comments && post.comments.length > 0 && (
                                <ul className='list-group' style={{ height: "120px", overflow: 'scroll' }}>
                                    {post.comments.slice(0, commentsCount).map(x => (
                                        <li key={x._id} className='list-group-item d-flex justify-content-between align-items-start' >
                                            <div className='ms-2 me-auto'>
                                                <Avatar size={30} className="mb-1 mr-3 " src={imageSrc(x.postedBy)} /> {x.postedBy.name}
                                                <div className="font-weight-bold">{x.text}</div>
                                            </div>
                                            <span className='badge rounded-pill text-dark'>
                                                {moment(x.created).fromNow()}
                                                {state && state.user._id === x.postedBy._id &&
                                                    <div onClick={() => removeComment(post._id, x)} className='ml-auto mt-2 text-danger' >delete</div>
                                                }
                                            </span>
                                        </li>
                                    ))}

                                </ul>
                            )
                        }
                    </div>
                </>
            }

        </>
    )
}

export default Post
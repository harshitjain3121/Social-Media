import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileImage from './ProfileImage'
import TimeAgo from 'react-timeago'
import axios from 'axios'

const Feed = ({post}) => {
    const [creator, setCreator]=useState({})
    const token= useSelector(state=>state?.user?.currentUser?.token)

    const getPostCreater=async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${post?.creator}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
            setCreator(response?.data);
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(()=>{
        getPostCreater()
    },[])



  return (
    <article className='feed'>
        <header className="feed__header">
            <Link to={`/users/${post?.creator}`} className='feed_header-profile'>
                <ProfileImage image={creator?.ProfilePhoto}/>
                <div className="feed__header-details">
                    <h4>{creator?.fullName}</h4>
                    <small><TimeAgo date={post?.createdAt} /></small>
                </div>
            </Link>
        </header>
    </article>
  )
}

export default Feed
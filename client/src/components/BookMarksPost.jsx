import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import axios from 'axios';

const BookMarksPost = ({post}) => {
  const [user,setUser]=useState({})
  const userId=useSelector(state=> state?.user?.currentUser?.id)
  const token=useSelector(state=>state?.user?.currentUser?.token)
  const [postBookmarked, setPostBookmarked]= useState(user?.bookmarks?.includes(post?._id))


  
  
  
  
  const getUser=async()=>{
    try {
      const response=await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      setUser(response?.data)
      if(response?.data?.bookmarks?.includes(post?._id)){
        setPostBookmarked(true)
      }
      else{
        setPostBookmarked(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  
  useEffect(()=>{
    getUser()
  },[user, postBookmarked])
  


  const createBookmark=async()=>{
    try {
      const response=await axios.get(`${import.meta.env.VITE_API_URL}/posts/${post?._id}/bookmark`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if(response?.data?.bookmarks?.includes(post?._id)){
        setPostBookmarked(true)
      }
      else{
        setPostBookmarked(false)
      }
    } catch (error) {
      console.log(error)
    }
  }


  
  return (
    <button className="feed__footer-bookmark" onClick={createBookmark}>
      {postBookmarked? <FaBookmark/>: <FaRegBookmark/>}
    </button>
  )
}

export default BookMarksPost
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FriendRequest from './FriendRequest'

const FriendRequests = () => {

    const [friends, setFriends] =useState([])
    const userId= useSelector(state=>state?.user?.currentUser?.id)
    const token= useSelector(state=>state?.user?.currentUser?.token)

    const getFriends=async()=>{
        try {
            const response= await axios.get(`${import.meta.env.VITE_API_URL}/users`,{withCredentials: true, headers:{Authorization: `Bearer ${token}`}})
            const people=await response?.data?.filter(person=>{
                if(!person?.followers.includes(userId) && person?._id !==userId){
                    return person;
                }
            })
            setFriends(people)
        } catch (error) {
            console.log(error)
        }
    }

    const closeFriendBadge=(id)=>{
        setFriends(friends?.filter(friend=>{
            if(friend?._id !=id){
                return friend;
            }
        }))
    }

    useEffect(()=>{
        getFriends()
    },[])


  return (
    <menu className="friendRequests">
        <h3>Suggested Friends</h3>
        {
            friends?.map(friend=> <FriendRequest key={friend?._id} friend={friend} onFilterFriend={closeFriendBadge} />)
        }
    </menu>
  )
}

export default FriendRequests
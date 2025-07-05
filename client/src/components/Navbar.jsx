import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import ProfileImage from './ProfileImage'
import { useSelector } from 'react-redux';
import axios from 'axios';


const Navbar = () => {
  const [user,setUser]=useState({})
  const userId = useSelector(state => state?.user?.currentUser?.id);
  const token= useSelector(state => state?.user?.currentUser?.token);


  
  const navigate=useNavigate()


  const getUser=async()=>{
    try {
      const response=await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      setUser(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUser()
  },[])



  useEffect(() => {
    if(!token){
      navigate("/login")
    }
  }, [])



  useEffect(() => {
    setTimeout(()=>{
      navigate("/logout")
    },1000*60*60);
  }, [])
  



  return (
    <nav className="navbar">
      <div className="container navbar__container">
        <Link to="/" className='navbar__logo'>HARSHIT</Link>
        <form className='navbar__search'>
          <input type="search" placeholder='Search' />
          <button type="submit"><CiSearch /></button>
        </form>
        <div className="navbar__right">
          <Link to={`/users/${userId}`} className="navbar__profile">
            <ProfileImage image={user?.profilePhoto} />
          </Link>
          {token? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
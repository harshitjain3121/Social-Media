import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userActions } from '../store/user-slice';

const Logout = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(userActions.changeCurrentUser({}))
    localStorage.removeItem("currentUser");
    navigate('/login')
  },[])


  return (
    <div>Logout</div>
  )
}

export default Logout
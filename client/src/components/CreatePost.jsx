import React, { useState } from 'react'
import ProfileImage from './ProfileImage';
import { useSelector } from "react-redux"
import { SlPicture } from "react-icons/sl"
import { Link } from 'react-router-dom';

const CreatePost = ({onCreatePost, error}) => {
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const profilePhoto= useSelector(state=>state?.user?.currentUser?.profilePhoto)
  const userId= useSelector(state=>state?.user?.currentUser?.id)


  const createPost=(e) =>{
    e.preventDefault();
    const postData=new FormData();
    postData.set('body', body);
    postData.set('image',image);
    onCreatePost(postData);
    setBody("")
    setImage("")
  }





  return (
    <form className="createPost" encType='multipart/form-data' onSubmit={createPost}>
      {error && <p className='createPost__error-message'>{error}</p>}
      <div className="createPost__top">
        <Link to={`/users/${userId}`}>
          <ProfileImage image={profilePhoto} />
        </Link>
        <textarea value={body} onChange={e=> setBody(e.target.value)} placeholder="What's on your mind?" />
      </div>
      <div className="createPost__bottom">
        <span></span>
        <div className="createPost__actions">
          <label htmlFor="image"><SlPicture /></label>
          <input type="file" id='image' onChange={e => setImage(e.target.files[0])}/>
          <button type="submit">Post</button>
        </div>
      </div>
    </form>
  )
}

export default CreatePost
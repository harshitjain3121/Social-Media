const HttpError=require('../models/errorModel')
const UserModel=require('../models/userModel')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")



// {fullName, email, password, profilePhoto, bio, followers, following, bookmarks, posts}
// =====================================REGISTER USER
// POST : api/users/register
// UNPROTECTED
const registerUser=async(req,res,next)=>{
    try{
        const {fullName, email, password, confirmPassword}=req.body;
        if(!fullName || !email || !password || !confirmPassword){
            return next(new HttpError("Fill in all field",422));
        }
        const lowerCaseEmail=email.toLowerCase();
        const emailExists=await UserModel.findOne({email: lowerCaseEmail});
        if(emailExists){
            return next(new HttpError("Email already exists",422))
        }
        if(password != confirmPassword){
            return next(new HttpError("Password do not match",422))
        }
        if(password.length<6){
            return next(new HttpError("Password should be at least 6 characters",422))
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await UserModel.create({fullName, email : lowerCaseEmail,password : hashedPassword})
        res.json(newUser).status(201);
    }catch(error){
        return next(new HttpError(error))
    }
}


// =====================================LOGIN USER
// POST : api/users/login
// UNPROTECTED
const loginUser=async(req,res,next)=>{
    try{
        const {email,password} =req.body;
        if(!email || !password){
            return next(new HttpError("Fill in all fields",422))
        }
        const lowerCaseEmail=email.toLowerCase();
        const user=await UserModel.findOne({email: lowerCaseEmail})
        if(!user){
            return next(new HttpError("Invalid Credential",422))
        }
        const {uPassword, ...userInfo}=user;
        const comparePass=await bcrypt.compare(password,user?.password);
        if(!comparePass){
            return next(new HttpError("Invalid Credential",422))
        }
        const token=await jwt.sign({id: user?._id},process.env.JWT_SECRET,{expiresIn: "1h"});
        res.json({token,id: user?._id, ...userInfo}).status(200);
    }catch(error){
        return next(new HttpError(error))
    }
}

// =====================================GET USER
// GET : api/users/:id
// PROTECTED
const getUser=async(req,res,next)=>{
    try{
        res.json("Get User")
    }catch(error){
        return next(new HttpError(error))
    }
}

// =====================================GET USERS
// GET : api/users
// PROTECTED
const getUsers=async(req,res,next)=>{
    try{
        res.json("Get Users")
    }catch(error){
        return next(new HttpError(error))
    }
}

// =====================================EDIT USER
// PATCH : api/users/:id
// PROTECTED
const editUser=async(req,res,next)=>{
    try{
        res.json("Edit User")
    }catch(error){
        return next(new HttpError(error))
    }
}

// =====================================FOLLOW/UNFOLLOW USER
// GET : api/users/:id/follow-unfollow
// PROTECTED
const followUnfollowUser=async(req,res,next)=>{
    try{
        res.json("follow/Unfollow User")
    }catch(error){
        return next(new HttpError(error))
    }
}

// =====================================CHANGE USER PROFILE USER
// POST : api/users/avatar
// PROTECTED
const changeUserAvatar=async(req,res,next)=>{
    try{
        res.json("Change User Avatar")
    }catch(error){
        return next(new HttpError(error))
    }
}

module.exports={registerUser, loginUser, getUser, getUsers, editUser, followUnfollowUser, changeUserAvatar}
const HttpError=require('../models/errorModel')
const PostModel=require('../models/postModel')
const UserModel=require('../models/userModel')

const {v4: uuid}=require("uuid")
const cloudinary=require('../utils/cloudinary')
const fs=require('fs')
const path=require('path')




// =================CREATE POST
// POST : api/posts
// PROTECTED
const createPost=async(req,res,next)=>{
    try{
        const {body}=req.body;
        if(!body){
            return next(new HttpError("Fill in text field and choose image", 422))
        }
        if(!req.files.image){
            return next(new HttpError("Please choose an image"),422)
        }
        else{
            const {image}=req.files;
            if(image.size>1000000){
                return next(new HttpError("Image is too big. Should be less than 500kb",422))
            }
            let fileName=image.name;
            fileName = fileName.split(".");
            fileName =fileName[0]+uuid()+"."+fileName[fileName.length-1];
            await image.mv(path.join(__dirname,"..","uploads",fileName),async(err)=>{
                if(err){
                    return next(new HttpError(err))
                }
                const result=await cloudinary.uploader.upload(path.join(__dirname,"..","uploads",fileName),{resource_type: "image"})
                if(!result.secure_url){
                    return next(new HttpError("Couldn't upload image to cloudinary",422))
                }
                const newPost=await PostModel.create({creator: req.user.id,body,image: result.secure_url})
                await UserModel.findByIdAndUpdate(newPost?.creator, {$push: {posts: newPost?.id}})
                res.json(newPost)
            })
        }
    }catch(error){
        return next(new HttpError(error))
    }
}




// =================GET POST
// GET : api/posts/:id
// PROTECTED
const getPost=async(req,res,next)=>{
    try{
        const {id} =req.params;
        const post=await PostModel.findById(id)
        // const post=await PostModel.findById(id).populate("creator").populate({path: "comments", options: {sort: {createdAt: -1}}})
        if(!post){
            return next(new HttpError("post not found",422))
        }
        res.json(post);
    }catch(error){
        return next(new HttpError(error))
    }
}




// =================GET POSTS
// GET : api/posts
// PROTECTED
const getPosts=async(req,res,next)=>{
    try{
        const posts = await PostModel.find().sort({createAt: -1})
        res.json(posts)
    }catch(error){
        return next(new HttpError(error))
    }
}




// =================UPDATE POST
// PATCH : api/posts/:id
// PROTECTED
const updatePost=async(req,res,next)=>{
    try{
        const postId=req.params.id;
        const {body}=req.body;
        const post=await PostModel.findById(postId);
        // const post=await PostModel.findById(postId).populate('creator');
        if(post?.creator != req.user.id){
            return next(new HttpError("you can't update the post since you are not the creator",403))
        }
        // return res.json({ok:false, msg:"unauthorized"});
        const updatedPost= await PostModel.findByIdAndUpdate(postId, {body}, {new : true})
        res.json(updatedPost).status(200);
    }catch(error){
        return next(new HttpError(error))
    }
}




// =================DELETE POST
// DELETE : api/posts/:id
// PROTECTED
const deletePost=async(req,res,next)=>{
    try{
        const postId=req.params.id;
        const post=await PostModel.findById(postId);
        if(post?.creator != req.user.id){
            return next(new HttpError("you can't delete the post since you are not the creator",403))
            // return res.json({ok:false, msg:"unauthorized"});
        }
        const deletedPost= await PostModel.findByIdAndDelete(postId)
        await UserModel.findByIdAndUpdate(post?.creator, {$pull: {posts: post?.id}})
        res.json(deletedPost)
    }catch(error){
        return next(new HttpError(error))
    }
}




// =================GET FOLLOWINGS POSTS
// GET : api/posts/followings
// PROTECTED
const getFollowingPosts=async(req,res,next)=>{
    try{
        const user=await UserModel.findById(req.user.id);
        const posts=await PostModel.find({creator: {$in: user?.following}})
        res.json(posts)
    }catch(error){
        return res.json({ok:false});
        // return next(new HttpError(error))
    }
}




// =================LIKE/DISLIKE POST
//GET : api/posts/:id/like
// PROTECTED
const likeDislikePost=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const post= await PostModel.findById(id);
        let updatePost;
        if(post?.likes.includes(req.user.id)){
            updatePost=await PostModel.findByIdAndUpdate(id, {$pull: {likes: req.user.id}}, {new: true})
        }
        else{
            updatePost=await PostModel.findByIdAndUpdate(id, {$push: {likes: req.user.id}}, {new: true})
        }
        res.json(updatePost)
    }catch(error){
        return next(new HttpError(error))
    }
}




// =================GET USER POSTS
// GET : api/users/:id/posts
// PROTECTED
const getUserPosts=async(req,res,next)=>{
    try{
        const userId=req.params.id;
        const posts=await UserModel.findById(userId).populate({path: "posts", options: {sort: {createAt: -1}}})
        res.json(posts);
    }catch(error){
        return next(new HttpError(error))
    }
}




// =================CREATE BOOKMARK
// POST : api/posts/:id/bookmark
// PROTECTED
const createBookmark=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const user=await UserModel.findById(req.user.id);
        let userBookmarks;
        if(user?.bookmarks.includes(id)){
            userBookmarks=await UserModel.findByIdAndUpdate(req.user.id, {$pull: {bookmarks: id}}, {new: true})
        }
        else{
            userBookmarks=await UserModel.findByIdAndUpdate(req.user.id, {$push: {bookmarks: id}}, {new: true})
        }
        res.json(userBookmarks);
    }catch(error){
        return next(new HttpError(error))
    }
}





// =================GET BOOKMARKS
// GET : api/bookmark
// PROTECTED
const getUserBookmarks=async(req,res,next)=>{
    try{
        const userBookmarks=await UserModel.findById(req.user.id).populate({path: "bookmarks", options: {sort: {createdAt: -1}}})
        res.json(userBookmarks);
    }catch(error){
        return next(new HttpError(error))
    }
}







module.exports={createPost,updatePost, deletePost, getPost, getPosts, getUserPosts, getUserBookmarks, createBookmark, likeDislikePost, getFollowingPosts}
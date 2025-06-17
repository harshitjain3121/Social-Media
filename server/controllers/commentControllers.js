const HttpError=require('../models/errorModel')
const PostModel=require('../models/postModel')
const UserModel=require('../models/userModel')
const CommentModel=require('../models/commentModel')




// =================CREATE COMMENT
// POST : api/comments/:postId
// PROTECTED
const createComment=async(req,res,next)=>{
    try{
        const {postId}=req.params;
        const {comment}=req.body;
        if(!comment){
            return next(new HttpError("Please write a comment", 422))
        }
        const commentCreator=await UserModel.findById(req.user.id)
        const newComment=await CommentModel.create({creator: {creatorId: req.user.id, creatorName: commentCreator?.fullName, creatorPhoto: commentCreator?.profilePhoto}, comment, postId})
        await PostModel.findByIdAndUpdate(postId, {$push: {comments: newComment?._id}},{new : true})
        res.json(newComment)
    }catch(error){
        return next(new HttpError(error))
    }
}





// =================GET POST COMMENTS
// GET : api/comments/:postId
// PROTECTED
const getPostComments=async(req,res,next)=>{
    try{
        const {postId} = req.params;
        const comments=await PostModel.findById(postId).populate({path: "comments", options: {sort: {createdAt: -1}}})
        res.json(comments)
    }catch(error){
        return next(new HttpError(error))
    }
}





// =================DELETE COMMENT
// DELETE : api/comments/:commentId
// PROTECTED
const deleteComment=async(req,res,next)=>{
    try{
        const {commentId} = req.params;
        const comment=await CommentModel.findById(commentId);
        const commentCreator=await UserModel.findById(comment?.creator?.creatorId)
        if(commentCreator?.id != req.user.id){
            return next(new HttpError("Unauthorized action." , 403))
        }
        await PostModel.findByIdAndUpdate(comment?.postId, {$pull: {comments: commentId}})
        const deleteComment=await CommentModel.findByIdAndDelete(commentId)
        res.json(deleteComment)
    }catch(error){
        return next(new HttpError(error))
    }
}




module.exports={createComment, getPostComments, deleteComment};
const {Schema, model}=require("mongoose");

const userSchema = new Schema({
    fullName: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    profilePhoto: {type: String, default: "https://res.cloudinary.com/dojycmppc/image/upload/v1746956414/Sample_User_Icon_dsqjia.png"},
    bio: {type: String, default: "No bio yet"},
    followers: [{type: Schema.Types.ObjectId, ref: "User"}],
    following: [{type: Schema.Types.ObjectId, ref: "User"}],
    bookmarks: [{type: Schema.Types.ObjectId, ref: "Post"}],
    posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
}, {timestamps: true})

module.exports = model("User", userSchema);
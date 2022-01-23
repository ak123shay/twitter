const express = require('express')
const postrouter = express.Router()

const mongoose = require('mongoose')
const postSchema = require('../model/postSchema')
const userSchema = require('../model/user')

const PostSchema = new mongoose.Schema(postSchema)
const Post = mongoose.model("post", PostSchema)

 const UserSchema = new mongoose.Schema(userSchema)
 const PostUser = mongoose.model("User",UserSchema)

postrouter.post("/:user_id" ,async (request , response)=>{
    const post = new Post(request.body);
    const _id = request.params.user_id

    post.creation_date = Date.now()
    post.user_id =  request.params.user_id

    try {
        post.save()
        console.log(_id)

        //  PostUser.create({ user_id : _id});
        // const filter = {user_id : _id}
        // const update = {post_ids : [].push(post.post_id)}
        //  PostUser.findOneAndUpdate(filter, update);
        // console.log(post)
        const post_user = await PostUser.find({_id})
        
        // user.post_ids.push(post.post_id)
        post_user[0].post_ids.push(post.post_id)
        console.log(post_user[0].post_ids)
        const p = new PostUser(post_user)
        p.save()
        response.send(post)
      
    } catch (error) {
        response.status(500).send(error)
    }
    
}).get('/:user_id', async (request,response) => {
    const user_id = request.params.user_id
    const posts = await Post.find({user_id})
    try {
      response.send(posts)
    } catch (error) {
      response.status(500).send(error)
    }
})

module.exports = postrouter
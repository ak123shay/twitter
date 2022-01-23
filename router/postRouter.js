const express = require('express')
const postrouter = express.Router()
const mongoose = require('mongoose')
const postSchema = require('../model/postSchema')
const userSchema = require('../model/user')

const PostSchema = new mongoose.Schema(postSchema)
const Post = mongoose.model("post", PostSchema)

const UserSchema = new mongoose.Schema(userSchema)
const PostUser = mongoose.model("User", UserSchema)

postrouter.post("/:user_handle", async (request, response) => {
  if (!request.body.user_handle) {
    response.send({
      Error: "user handle required"
    }, 403)
  }
  if (!request.body.content) {
    response.send({
      Error: "Content can not be Empty"
    }, 403)
  }
  const user = await User.find({ user_handle: request.params.user_handle })
  if (!user) {
    response.send({
      error: "No user found"
    }, 404)
  } else {
    let tmpPost = request.body
    tmpPost.creation_date = Date.now()
    tmpPost.user_handle = request.params.user_handle
    const post = new Post(tmpPost);
    const _id = request.params.user_handle

    try {
      post.save()
      const post_user = await PostUser.find({ user_handle: _id })
      console.log(post_user)
      post_user[0].post_ids.push(post.post_id)

      await post_user[0].save()
      response.send(post)

    } catch (error) {
      response.status(500).send(error)
    }

  }


}).get('/:user_handle', async (request, response) => {
  if (!request.body.user_handle) {
    response.send({
      Error: "user handle required"
    }, 403)
  }
  const user_handle = request.params.user_handle
  const posts = await Post.find({ user_handle: user_handle })
  try {
    response.send(posts)
  } catch (error) {
    response.status(500).send(error)
  }
})

module.exports = postrouter
const { request, response } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const userSchema = require('../model/user')
const UserSchema = new mongoose.Schema(userSchema)
const User = mongoose.model("user", UserSchema)

router.post("/add_user", async (request, response) => {
    if(!request.body.user_handle) {
        response.send({
            Error: "user handle required"
        }, 403)
    } 
    const preUser = await User.find({ user_handle: request.body.user_handle })
    if(preUser.length > 0) {
        response.send({
            Error: "user already exists"
        }, 403)
    }
    const user = new User(request.body)
    try {
      user.save()
      response.send(user)
    } catch (error) {
      response.status(500).send(error)
    }
    }).get("/users", async (request, response) => {
        const users = await User.find({})
        try {
        response.send(users)
        } catch (error) {
        response.status(500).send(error)
        }
    }).get("/:user_handle",async (request, response) => {
        const user = await User.find({ user_handle: request.params.user_handle })
        if(!user) {
            response.send({
                error: "No user found"
            }, 404)
        } else {
            response.send(user, 200)
        }
    }).get("/:user_handle/followers", async (request, response) => {
        const user = await User.find({ user_handle: request.params.user_handle })
        if(!user) {
            response.send({
                error: "No user found"
            }, 404)
        } else {
            // console.log(user[0].followers)
            response.send(user[0].followers, 200)
        }
    }).get("/:user/following", async (request,response) => {
        const user = await User.find({ user_handle: request.params.user })
        if(!user) {
            response.send({
                error: "No user found"
            }, 404)
        } else {
            console.log(user[0].following)
            response.send(user[0].following, 200)
        }
    }).post("/:user1/follows/:user2", async (request, response ) => {
        const user1 = await User.find({ user_handle: request.params.user1 })
        const user2 = await User.find({ user_handle: request.params.user2 })
        if(user1.length > 0 && user2.length > 0) {
            user1[0].following.push(user2[0].user_handle)
            await user1[0].save()
            response.send(`${user1[0].user_handle} followed ${user2[0].user_handle}`,200)
        } else {
            response.send({
                Error: "user not found!!"
            }, 404)
        }
    })

module.exports = router
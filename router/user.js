const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const userSchema = require('../model/user')
const UserSchema = new mongoose.Schema(userSchema)
const User = mongoose.model("user", UserSchema)

router.post("/add_user", (request, response) => {
    const user = new User(request.body);
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
  })

module.exports = router
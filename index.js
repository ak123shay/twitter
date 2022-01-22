const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userSchema = require('./model/user')
const db = mongoose.connection

try {
    mongoose.connect('mongodb://localhost:27017/twitter')
  } catch (error) {
    handleError(error)
  }

db.on("error", console.error.bind(console, "connection error: "))
db.once("open", function () {
  console.log("Connected successfully")
});

app.use(bodyParser.json())

app.listen(3000, () => {
  console.log("Server is running at port 3000")
})

const UserSchema = new mongoose.Schema(userSchema)
const User = mongoose.model("user", UserSchema)

app.post("/add_user", (request, response) => {
    const user = new User(request.body);
    try {
      user.save()
      response.send(user)
    } catch (error) {
      response.status(500).send(error)
    }
});

app.get("/users", async (request, response) => {
    const users = await User.find({})
  
    try {
      response.send(users)
    } catch (error) {
      response.status(500).send(error)
    }
  });

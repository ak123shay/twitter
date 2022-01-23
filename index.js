const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRouter = require('./router/user')
const db = mongoose.connection
var userRouter = require('./router/user')
var postRouter = require('./router/postRouter')
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

app.use('/user', userRouter)
app.use('/user/post', postRouter)



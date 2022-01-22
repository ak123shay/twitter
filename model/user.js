let mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userSchema = {
    user_handle: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
        description: "must be a string and is required"
    },
    last_name: {
        type: String,
        required: true,
        description: "must be a string and is required"
    },
    post_ids: {
        type: Array
    },
    followers: {
        type: Array
    },
    following: {
        type: Array
    }
 }

 const postSchema = {
    post_id: {
        type: Schema.ObjectId,
        required: true,
        auto: true
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.ObjectId,
        required: true
    },
    creation_date: {
        type: Date,
        required: true
    },
    likes: {
        type: Number,
        required: true
    }
 }

module.exports = userSchema
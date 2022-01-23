let mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        required: false
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    }
 }

 module.exports = postSchema
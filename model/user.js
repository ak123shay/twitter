let mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userSchema = {
    user_id: {
        type: Schema.ObjectId,
        required: true,
        auto: true
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

 

module.exports = userSchema
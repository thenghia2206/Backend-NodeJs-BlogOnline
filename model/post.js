const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    titlle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    desciption: {
        type: String,
        required: true
    },
    thumnail: {
        type: String ,
        default: ""
    },
    numlike: {
        type: Number,
        default: 0
    },
    numcmt: {
        type: Number,
        default: 0
    },
    numlike: {
        type: Number,
        default: 0
    },
    categoryId:{
        type: String,
        required: true
    }

}, {timestamps: true});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;
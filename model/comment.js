const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    nameUser: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }

},{timestamps: true});

const Comment = mongoose.model('Comment',CommentSchema);
module.exports = Comment;
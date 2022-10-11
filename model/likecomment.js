const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LikeCommentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    commentId: {
        type: String,
        required: true
    }
    
});

const LikeComment = mongoose.model('LikeComment',LikeCommentSchema);
module.exports = LikeComment;
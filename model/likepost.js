const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LikePostSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }

});

const LikePost = mongoose.model('LikePost',LikePostSchema);
module.exports = LikePost;
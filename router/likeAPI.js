const express = require('express');
const router = express.Router()
const LikePost = require('../model/likepost');
const Post = require('../model/post');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenPost, verifyPost } = require('./verifyToken');

router.post('/:id', verifyToken, verifyPost , async (req,res) => {
    try{
    const liked = await LikePost.findOne({postId: req.params.id , userId: req.decoded.id})
    const idLike = liked._id
    await LikePost.findByIdAndDelete({_id: idLike})
    await LikePost.update()
    const numLike = await  LikePost.find({postId: req.params.id}).countDocuments();
    await Post.findByIdAndUpdate({_id:req.params.id}, { $set: {numlike: numLike}});
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
    // res.send("unlike")
    }catch(err) {   
    const like = new LikePost({
                userId: req.decoded.id,
                postId: req.params.id
    })
    like.save()
    await LikePost.update()
    const num_Like = await LikePost.find({postId: req.params.id}).countDocuments();
    await Post.findByIdAndUpdate({_id:req.params.id}, { $set: {numlike: num_Like}});
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
    // res.send("like")
    }   
})


module.exports = router
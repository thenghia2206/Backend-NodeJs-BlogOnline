const express = require('express');
const router = express.Router()
const CommentPost = require('../model/comment');
const LikeComment = require('../model/likecomment');
const Post = require('../model/post');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenPost, verifyPost, verifyComment, verifyTokenAdmin, checkComment } = require('./verifyToken');

router.post('/:id',verifyToken,verifyPost, checkComment ,(req,res) => {
    const comment = new CommentPost({
        content: req.body.content,
        nameUser: req.decoded.fullname,
        userId: req.decoded.id,
        postId: req.params.id
    })
    comment.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })

})
router.delete('/Delete/:id',verifyToken,verifyTokenAdmin ,verifyComment, async (req, res) => {
    try {
        await CommentPost.findByIdAndDelete({_id: req.params.id});
        res.status(200).json("Delete comment success");
    } catch (err) {
      res.status(500).json("Delete comment fail !");
    }
})


router.post('/like/:id', verifyToken, verifyPost, verifyComment , async (req,res) => {
    try{
    const liked = await LikeComment.findOne({postId: req.params.id , userId: req.decoded.id})
    const idLike = liked._id
    await LikeComment.findByIdAndDelete({_id: idLike})
    await LikeComment.update()
    const numLike = await  LikeComment.find({commentId: req.params.id}).countDocuments();
    const comment = await CommentPost.findById(req.params.id)
    res.status(200).json({comment, "Num_Like": numLike})
    // res.send("unlike")
    }catch(err) {   
    const like = new LikeComment({
                userId: req.decoded.id,
                commentId: req.params.id
    })
    like.save()
    await LikeComment.update()
    const num_Like = await LikeComment.find({commentId: req.params.id}).countDocuments();
    const comment = await CommentPost.findById(req.params.id)
    res.status(200).json({comment, "Num_Like": num_Like})
    // res.send("like")
    }   
})


module.exports = router
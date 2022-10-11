const express = require('express');
const router = express.Router()
const Post = require('../model/post');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenPost, checkPost } = require('./verifyToken');

router.post('/add',verifyToken,checkPost,(req, res) => {
    const post = new Post({
        userId: req.decoded.id,
        titlle: req.body.titlle,
        content: req.body.content,
        desciption: req.body.desciption,
        categoryId: req.body.categoryId
    })
    post.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/getAll',verifyToken, (req,res)=>{
    Post.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) =>{
            console.log(err)
        })
})
router.get('/getAll/User',verifyToken, (req,res)=>{
    Post.find({userId: req.decoded.id})
        .then((result) => {
            res.send(result)
        })
        .catch((err) =>{
            console.log(err)
        })
})


router.get('/get/:id',verifyToken,(req,res)=>{
    const post_id = req.params.id
    Post.findById(post_id)
        .then((result) => {
            res.send(result)
        })
        .catch((err) =>{
            console.log(err)
        })
})

router.put('/UpdatePost/:id',verifyToken,verifyTokenPost , async (req, res) => {
    try {
        await Post.findByIdAndUpdate({_id:req.params.id}, req.body);
        const post_new = await Post.findById({_id:req.params.id})
        res.status(200).json(post_new);
    } catch (err) {
      res.status(500).json(err);
    }
})
router.delete('/Delete/:id',verifyToken, verifyTokenPost, async (req, res) => {
    try {
        await Post.findByIdAndDelete({_id: req.params.id});
        res.status(200).json("Delete post success");
    } catch (err) {
      res.status(500).json("Delete post fail !");
    }
})

module.exports = router
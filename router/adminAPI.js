const express = require('express');
const router = express.Router()
const Post = require('../model/post');
const User = require('../model/user');
const { verifyToken, verifyAdmin,verifyUser } = require('./verifyToken');

router.put('/BanComment/:id',verifyToken,verifyAdmin,verifyUser , async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user.cmtstatus){
            await User.findByIdAndUpdate({_id:req.params.id}, { $set: {cmtstatus: 0}});
            User.update()
            const user_id = await User.findById(req.params.id)
            const{ password, ...other} = user_id._doc
            res.status(200).json(other);
        }else{
            await User.findByIdAndUpdate({_id:req.params.id}, { $set: {cmtstatus: 1}});
            User.update()
            const user_id = await User.findById(req.params.id)
            const{ password, ...other} = user_id._doc
            res.status(200).json(other);
        }
        
        
    } catch (err) {
      res.status(500).json("Ban Fail !");
    }
})
router.put('/BanPost/:id',verifyToken,verifyAdmin,verifyUser , async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user.poststatus){
            await User.findByIdAndUpdate({_id:req.params.id}, { $set: {poststatus: 0}});
            User.update()
            const user_id = await User.findById(req.params.id)
            const{ password, ...other} = user_id._doc
            res.status(200).json(other);
        }else{
            await User.findByIdAndUpdate({_id:req.params.id}, { $set: {poststatus: 1}});
            User.update()
            const user_id = await User.findById(req.params.id)
            const{ password, ...other} = user_id._doc
            res.status(200).json(other);
        }
        
    } catch (err) {
      res.status(500).json("Ban Fail !");
    }
})

module.exports = router
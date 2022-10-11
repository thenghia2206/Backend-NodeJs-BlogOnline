const express = require('express');
const User = require('../model/user');
const router = express.Router()
const CryptoJS = require("crypto-js")
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken")


router.put("/change-password/:id",verifyToken,verifyTokenAndAuthorization, async (req, res) => {
    // console.log(req.body.password)
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
        await User.findByIdAndUpdate({_id:req.params.id}, req.body);
        res.status(200).json("OK");
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id',verifyToken,verifyTokenAndAuthorization ,async (req, res) =>{
    try{
        const user_id = await User.findById(req.params.id)
        const{ password, ...other} = user_id._doc
        res.status(200).json(other)
    }catch (err){
        res.status(500).json(err)
    }
    
})

module.exports = router
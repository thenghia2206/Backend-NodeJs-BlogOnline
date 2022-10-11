const express = require('express');
const router = express.Router()
const User = require("../model/user")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    const newUser = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC.toString())
    })
    try {
        await newUser.save()
        res.status(201).json("Register Success")
    } catch (err) {
        res.status(500).json("Register Fail")
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).json("Wrong credentials !")
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const pass = hashedPassword.toString(CryptoJS.enc.Utf8)
        pass !== req.body.password && res.status(401).json("Wrong credentials !")
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin,
            fullname: user.fullname,          
            cmtstatus: user.cmtstatus,
            poststatus: user.poststatus,
        },
        process.env.JWT_SEC,{
            expiresIn:"30m"
        }
        )
        const { password , ...other} = user._doc
        res.status(200).json({...other,  accessToken})
    } catch (err) {
        res.status(500).json("Login Fail")
    }

})


module.exports = router
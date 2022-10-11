const jwt = require("jsonwebtoken");
const Post = require("../model/post");
const Comment = require("../model/comment");
const User = require("../model/user");

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401)
    try {
        const decoded = jwt.verify(token, process.env.PASS_SEC)
        req.decoded = decoded
        next()

    } catch (error) {
        console.log(error)
        res.sendStatus(403)
    }
    
  };

const verifyTokenAndAuthorization = (req, res, next) => {
    if (req.decoded.id === req.params.id || req.decoded.isAdmin ) {
        next();
    } else {
        res.status(403).json("You are not alowed to do that!");
      }
  };

const verifyAdmin = (req, res, next) => {
    if ( req.decoded.isAdmin ) {
        next();
    } else {
        res.status(403).json("You are not alowed to do that!");
      }
  };

const verifyUser = (req, res, next) => {
    User.findById(req.params.id)
        .then((result) => {
            next();
        })
        .catch((err) =>{
            res.status(403).json("User does not exist")
        })
  };  

const verifyTokenAdmin = (req, res, next) => {
    Comment.findById(req.params.id)
        .then((result) => {
            if (req.decoded.id === result.userId|| req.decoded.isAdmin ) {
                next();
            } else {
                res.status(403).json("You are not alowed to do that!");
              }
        })
        .catch((err) =>{
            res.status(403).json("Comment does not exist")
        })
  };

const verifyTokenPost = (req, res, next) => { 
    Post.findById(req.params.id)
        .then((result) => {
            if (req.decoded.id === result.userId|| req.decoded.isAdmin ) {
                next();
            } else {
                res.status(403).json("You are not alowed to do that!");
              }
        })
        .catch((err) =>{
            res.status(403).json("Post does not exist")
        })
  };

const verifyPost = (req, res, next) => { 
    Post.findById(req.params.id)
        .then((result) => {
            next();
        })
        .catch((err) =>{
            res.status(403).json("Post does not exist")
        })
  };
const verifyComment = (req, res, next) => { 
    Comment.findById(req.params.id)
        .then((result) => {
            next();
        })
        .catch((err) =>{
            res.status(403).json("Comment does not exist")
        })
  };

const checkComment = (req, res,next)=> {
    if ( req.decoded.cmtstatus ) {
        next();
    } else {
        res.status(403).json("You have been ban");
    }
}

const checkPost = (req, res, next) =>{
    if ( req.decoded.poststatus ) {
        next();
    } else {
        res.status(403).json("You have been ban");
    }
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenPost,
    verifyPost,
    verifyComment,
    verifyTokenAdmin,
    verifyAdmin,
    verifyUser,
    checkComment,
    checkPost
}
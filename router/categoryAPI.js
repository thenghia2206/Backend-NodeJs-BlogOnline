const express = require('express');
const router = express.Router()
const Category = require('../model/category');
const { verifyToken } = require('./verifyToken');


router.get('/all',verifyToken,(req, res) => {
    Category.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})
router.get('/:id',verifyToken,(req, res) => {
    Category.findById(req.params.id)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})


module.exports = router
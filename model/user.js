const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String ,
        default: ""
    },
    isAdmin:{
        type: Number,
        default: 0
    },
    poststatus:{
        type: Number,
        default: 1
    },
    cmtstatus:{
        type : Number,
        default: 1
    }
}, {timestamps: true});

const User = mongoose.model('User',UserSchema);
module.exports = User;
const express = require('express');
const morgan = require('morgan');
const dotenv = require("dotenv")
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const PostRouter = require('./router/postsAPI')
const AuthRouter = require('./router/auth')
const UserRouter = require('./router/userAPI')
const CategoryRouter = require('./router/categoryAPI')
const LikeRouter= require('./router/likeAPI')
const CommentRouter= require('./router/commentAPI')
const AdminRouter = require('./router/adminAPI')
var bodyParser = require('body-parser')


dotenv.config()
app.use(bodyParser.json())
app.use(express.json());

//conect to mongodb
const dbURI = 'mongodb+srv://thenghia:22062001@blog.jjxmsof.mongodb.net/blog?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));



app.use('/auth',AuthRouter);
app.use('/user',UserRouter);
app.use('/posts',PostRouter);
app.use('/category',CategoryRouter);
app.use('/like',LikeRouter);
app.use('/comment',CommentRouter);
app.use('/admin',AdminRouter);


app.get('/', (req, res) => res.send('Thế Nghĩa'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

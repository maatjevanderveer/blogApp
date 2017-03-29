// REQUIRE LIBRARIES
const express = require('express');
const pg = require('pg');
const Sequelize = require ('sequelize');
const bodyParser = require ('body-parser');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require(__dirname + '/../models/db.js');

//SETUP VIEW ENGINE
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// MIDDLEWARE
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to ssupport URL-encoded bodies
	extended: false })); 
app.use('/static', express.static('static'));// Folder to serve to client-side

// SESSION
app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

// ROUTES
const indexRouter = require(__dirname + '/routes/index.js') 
const loginRouter = require(__dirname + '/routes/login.js') 
const logoutRouter = require(__dirname + '/routes/logout.js') 
const signupRouter = require(__dirname + '/routes/signup.js') 
const profileRouter = require(__dirname + '/routes/profile.js') 
const postsRouter = require(__dirname + '/routes/posts.js') 
const commentsRouter = require(__dirname + '/routes/comments.js') 
const commentRouter = require(__dirname + '/routes/comment.js')

app.use('/', indexRouter)
app.use('/signup', signupRouter)
app.use('/logout', logoutRouter)
app.use('/login', loginRouter)
app.use('/profile', profileRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)
app.use('/comment', commentRouter)

// PORT #
app.listen(3000, () => {
    console.log('the server is running on localhost:3000')
});


module.exports = app;

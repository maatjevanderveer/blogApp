// DEFINING
const express = require('express')
const app = express.Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const pg = require('pg')
const db = require(__dirname + '/../../models/db.js')


// GET REQUEST: SHOW ALL POSTS
app.get('/', function(request, response){
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/login');
	} else {
		db.Post.findAll(
		{
			include: [db.User, db.Comment]
		}
		)
		.then (function(posts){
			response.render('../../views/posts.pug',
			{
				messages:posts,
				name: request.session.user.userName
			});
		})
	}
});

// POST REQUEST: SHOW ALL POSTS
app.post('/', function(request, response){
	db.Post.create({
		title: request.body.title,
		body: request.body.body,
		userId: request.session.user.id
		//  
	}).then(function(){
		response.redirect("/posts")
	})
});

module.exports = app;
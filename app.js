const db = require(__dirname + '/models/db.js')
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');

// VIEW ENGING SET UP
app.set('view engine', 'pug'); // pug is defined as the view engine in the express application
app.set('views', './views') // this defaults to the view directory in the application root directory

// MIDDLEWARE
app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

// ROUTING
// LOGIN
app.get('/', function (request, response) {
	response.render('index', {
		message: request.query.message,
		user: request.session.user
	});
});

app.post('/login', bodyparser.urlencoded({extended: true}), function (request, response) {
	if(request.body.email.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
		return;
	}

	if(request.body.password.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
		return;
	}

	db.User.findOne({
		where: {
			email: request.body.email
		}
	}).then(function (user) {
		if (user !== null && request.body.password === user.password) {
			request.session.user = user; // VERY IMPORTANT :)
			response.redirect('/profile');
		} else {
			response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
		}
	}, function (error) {
		response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
	});
});

// PROFILE
app.get('/profile', function (request, response) {
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	} else {
		response.render('profile', {
			user: user
		});
	}
});

// LOGOUT
app.get('/logout', function (request, response) {
	request.session.destroy(function(error) {
		if(error) {
			throw error;
		}
		response.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	})
});

// REGISTER 
app.get('/register', function (request, response) {
	response.render('register')
})

app.post('/newuser', bodyparser.urlencoded({extended: true}), function(request, response) {
	
	db.User.create({
		username: request.body.newUsername,
		email: request.body.newEmail,
		password: request.body.newPassword
	}).then( (newUser) =>{
		console.log(newUser)
		// response.redirect('/profile')
		response.redirect('/?message=' + encodeURIComponent("Successfully registered. Login now."));
	})
	// connect to database
	// 
})

// CREATE POST
app.get('/createpost', function (request, response) {
	response.render('createpost')
})

app.post('/newpost', bodyparser.urlencoded({extended: true}), function(request, response) {
	
	db.Post.create({
		title: request.body.newTitle,
		body: request.body.newPost
	}).then( (newPost) =>{
		console.log(newPost)
		response.redirect('/myownposts')
	})
	// connect to database
	// 
})

// ALL MY POSTS
app.get('/myownposts', function(request, response) {
	db.Post.findAll()
	.then((allMyPosts) => {
		//const allTitles = []
		console.log(allMyPosts[0].dataValues)

		// for (var i = 0; i < allMessages.length; i++) {
		// 	allTitles.push(allMessages[i])
		// }
		// response.send(allTitles)
		response.render('myownposts', {allMyPosts:allMyPosts})
		//console.log('this logs all messages')
		//console.log(allTitles)
		
	})
})


app.listen(3000, () => {
	console.log('the server is running on localhost:3000')
});

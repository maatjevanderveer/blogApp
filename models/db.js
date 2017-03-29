// ADD SEQUELIZE LIBRARY
const Sequelize = require('sequelize');
const db = { };

// CONNECTING WITH DATABASE
db.connect = new Sequelize('blogapp', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  define: {
	  timestamps: false
  }
});

// TEST CONNECTION
db.connect
	.authenticate()
	.then(function(err) {
	   console.log('Connection has been established successfully.');
	}, function (err) {
		console.log('Unable to connect to the database:', err);
	});

// DEFINING USER MODEL
db.User = db.connect.define('user', {
	userName:  {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	},
	password:   {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	},
	email:   {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	}
});

// DEFINING POST MODEL
db.Post = db.connect.define('post', {
	title:  {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	},
	body:   {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	}
});

// DEFINING COMMENT MODEL
db.Comment = db.connect.define('comment', {
	userName:  {
		type: Sequelize.STRING,
//        allowNull: false,
		isUnique: true
	},
	body:   {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	}
});

// DB RELATIONS
db.User.hasMany(db.Post)
db.User.hasMany(db.Comment)
db.Post.belongsTo(db.User)
db.Post.hasMany(db.Comment)
db.Comment.belongsTo(db.Post)
db.Comment.belongsTo(db.User)

//SYNCING THE DATABASE AND CREATING ADMIN USER
db.connect
	.sync({force:true})

	.then(function(){
	return db.User.create({
		userName: 'Maatje',
		email: 'maatje@mail.com', 
		password: 'not_password'
	})
		.then(function(user) {
		return user.createPost({
		title: 'This is a title (Maatje)',
		body: 'This is the body of one post (Maatje)'
		})
	})
		.then(function(post){
		return post.createComment({
		body: 'This is a comment on my own post (Maatje)',
		userId: post.userId
		})
	})
		
		.then(function(){
		return db.User.create({
			userName: 'Kirsten',
			email: 'kirsten@mail.com', 
			password: 'not_password'
		})
	})
			.then(function(user) {
			return user.createPost({
				title: 'This is a title (Kirsten)',
				body: 'This is the body of one post (Kirsten)'
			})
		})
		.then(function(post){
			return post.createComment({
				body: 'This is one comment to my own post (Kirsten)',
				userId: post.userId
			})
		})
			
			.then(function(){
			return db.User.create({
				userName: 'Hajar',
				email: 'hajar@mail.com', 
				password: 'not_password'
			})
	})
			.then(function(user) {
				return user.createPost({
					title: 'This is the title of my post (Hajar)',
					body: 'This is the body of my own post (Hajar)'
				})
			})
			.then(function(post){
				return post.createComment({
					body: 'This is a comment of my own post (Hajar)',
					userId: post.userId
				})
			})
			.catch (function(error){
				console.log(error);
				})
			})


// EXPORT db
module.exports = db

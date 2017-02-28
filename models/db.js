//- JAVASCRIPT CODE TO COMMUNICATE WITH DATABASE BY USING SEQUELIZE //-

// SET UP CONNECTION WITH DATABASE
const Sequelize = require('sequelize')
const db = new Sequelize('blogapp', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	dialect: 'postgres'
}); // ('database name', 'username', 'password')

// DEFINE MODEL (W/ USERS)
const User = db.define('user', {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});

// DEFINE MODEL (W/ POSTS)
const Post = db.define('post', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	body: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	// User_id: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: false,
	// }
});

// //a person can have many posts...
// User.hasMany(Post, {
// 	foreignKey: 'User_id',
// 	constraints: false,
// });
// //... but a post belongs to a single person.
// Post.belongsTo(User, {
// 	foreignKey: 'User_id',
// 	constraints: false,
// });

// CREATE TABLE
db.sync({
	// force: true				// will drop tables before recreating them
})
.then(function(someParameter) {
	const oneUser = {
		username: "maatje",
		email: "maatje@maatje",
		password: "not_password"
	}
	User.create(oneUser)
	// .then(function() {
	// 	var server = app.listen(3000, function () {
	// 		console.log('listening on port 3000')
	// 	})
	// })
})
.catch( (error) => console.log(error) );

// CREATE TABLE
db.sync({
	// force: true				// will drop tables before recreating them
})
.then(function(someParameter) {
	const onePost = {
		title: "this is the title of some post",
		body: "this is the body of some post"
	}
	Post.create(onePost)
	// .then(function() {
	// 	var server = app.listen(3000, function () {
	// 		console.log('listening on port 3000')
	// 	})
	// })
})
.catch( (error) => console.log(error) );

// EXPORT MODEL (IN THIS CASE TO APP.JS)
module.exports = {
	db: db,
	User: User,
	Post: Post
}

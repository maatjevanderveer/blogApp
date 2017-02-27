//- JAVASCRIPT CODE TO COMMUNICATE WITH DATABASE BY USING SEQUELIZE //-

// SET UP CONNECTION WITH DATABASE
const Sequelize = require('sequelize')
const db = new Sequelize('blogapp', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	dialect: 'postgres'
}); // ('database', 'username', 'password')

// DEFINE MODEL 
const User = db.define('user', {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type:Sequelize.STRING,
		allowNull: false,
	},
	password: {
		type:Sequelize.STRING,
		allowNull: false,
	}
});

// CREATE TABLE
db.sync({
	force: true				// will drop tables before recreating them
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

// EXPORT MODEL (IN THIS CASE TO APP.JS)
module.exports = {
	db: db,
	User: User
}

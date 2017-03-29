// DEFINING
const express = require('express')
const app = express.Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const pg = require('pg')
const db = require(__dirname + '/../../models/db.js')

app.get('/', function (request, response) {
    req.session.destroy(function(error) {
        if(error) {
            throw error;
        }
        response.redirect('login')
        alert("Successfully logged out.");
    })
})

module.exports = app;
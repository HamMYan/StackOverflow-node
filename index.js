const express = require('express')
const app = express()
const session = require('express-session');
const router = require('./router')

app.set('view engine', 'hbs')
require('hbs').registerPartials(__dirname + '/views/component')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: '*', 
    resave: false,
    saveUninitialized: true
}));
app.use('/', router)

app.listen(8080)
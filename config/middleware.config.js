const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const express = require('express')
const cors = require('cors')
const { join } = require('path')

const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});


module.exports = app => {
    app.use(expressSession);
    app.use(cors())
    app.use(express.static(join(__dirname, '..', 'public')))
    app.use(logger('dev'))
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
}
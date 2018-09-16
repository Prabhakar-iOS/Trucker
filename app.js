let express = require('express')
let app = express()
let mongoose = require('mongoose')

let authServices = require('./app/routes/user')
mongoose.connect('mongodb+srv://prabhaproduct:P123456_n@restfulapitut-9vr1g.mongodb.net/trucker?retryWrites=true')
mongoose.Promise = global.Promise
let signup = require('./app/Controllers/signup')
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', authServices)

module.exports = app


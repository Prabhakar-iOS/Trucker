let express = require('express')
let app = express()
let mongoose = require('mongoose')
let router = express.Router()
mongoose.connect('mongodb+srv://prabhaproduct:P123456_n@restfulapitut-9vr1g.mongodb.net/trucker?retryWrites=true').then((db) => {
    console.log(db)
})
mongoose.Promise = global.Promise
let signup = require('./app/authenticate/signup')
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api/auth/', signup)

module.exports = app


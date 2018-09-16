let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    firstName: {type: String, required: true },
    lastName: {type: String, required: true },
    email: { type: String, required: true, unique: true, match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: { type: String, required: true },
    phone: { type: String, required: false }
})

module.exports = mongoose.model('User', userSchema)
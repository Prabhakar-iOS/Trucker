let express = require('express')
let mongoose =require('mongoose')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let router = express.Router()
let User = require('../models/User')

router.post('/register', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length > 0) {
            return res.status(422).json({
                message: 'email already exist'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    let user = new User({
                        id: new mongoose.Types.ObjectId,
                        email: req.body.email,
                        password: hash
                    })

                    user.save().then(doc => {
                        console.log(doc)
                        return res.status(201).json({
                            message: 'User was created successfully'
                        })
                    }).catch(err => {
                        return res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
})

router.post('/login', (req, res) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            })
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                } else if(result){
                    let token = jwt.sign({
                        email: user[0].email,
                        userId: user._id
                    }, 'supersecretkey',
                    {
                        expiresIn:'1h'
                    })

                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                } 
                return res.status(401).json({
                    message: 'Auth failed'
                })
            })
        }
    }).catch(err => {
        return res.status(500).json({
            error: err
        })
    })
})
module.exports = router
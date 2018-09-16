let mongoose =require('mongoose')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let User = require('../models/User')

exports.signup_user = (req, res, next) => {
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
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        phone: req.body.phone,
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
}

exports.login_user = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(users => {
        if (users.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            })
        } else {
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                } else if(result){
                    
                    let token = jwt.sign({
                        email: users[0].email,
                        userId: users[0]._id
                    }, 'supersecretkey',
                    {
                        expiresIn:'1h'
                    })

                    return res.status(200).json({
                        message: 'Auth successful',
                        user: {
                            firstName: users[0].firstName,
                            lastName: users[0].lastName,
                            email: users[0].email,
                            phone: users[0].phone
                        },
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
}

exports.delete_user = (req, res, next) => {
    User.remove({_id: req.body.userId})
    .exec()
    .then(result => {
        return res.status(200).json({
            message: 'User deleted successfully'
        })
    }).catch(err => {
        return res.status(500).json({
            error: err
        })
    })
}

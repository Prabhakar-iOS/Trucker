let express = require('express')
let router = express.Router()
let SignupController = require('../Controllers/signup')

router.post('/register', SignupController.signup_user)
router.post('/login', SignupController.login_user)
router.delete('/', SignupController.delete_user)

module.exports = router
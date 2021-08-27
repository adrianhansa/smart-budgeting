const router = require('express').Router()
const {register,login,deleteAccount} = require('../controllers/usersControllers')

router.post('/register',register)
router.post('/login',login)
router.delete('/delete-account',deleteAccount)

module.exports = router
const router = require('express').Router()
const {register,login,deleteAccount,logout} = require('../controllers/usersControllers')

router.post('/register',register)
router.post('/login',login)
router.delete('/delete-account',deleteAccount)
router.get('/logout',logout)

module.exports = router
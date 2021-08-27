const router = require('express').Router()
const {createAccount,getAccounts} = require('../controllers/accountsController')
const auth = require('../middlewares/auth')

router.post('/', auth, createAccount)
router.get('/', auth, getAccounts)

module.exports = router
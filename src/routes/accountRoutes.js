const router = require('express').Router()
const {createAccount,getAccounts} = require('../controllers/accountsController')

router.post('/',createAccount)
router.get('/', getAccounts)

module.exports = router
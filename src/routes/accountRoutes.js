const router = require('express').Router()
const {createAccount,getAccounts,getAccount,updateAccount,deleteAccount} = require('../controllers/accountsController')
const auth = require('../middlewares/auth')

router.post('/', auth, createAccount)
router.get('/', auth, getAccounts)
router.get("/:slug",auth, getAccount)
router.put("/:slug",auth, updateAccount)
router.delete("/:slug",auth, deleteAccount)

module.exports = router
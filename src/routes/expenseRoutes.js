const router = require('express').Router()
const {createExpense,getExpenses,getExpense,updateExpense,deleteExpense} = require('../controllers/expensesController')
const auth = require('../middlewares/auth')

router.post('/', auth, createExpense)
router.get('/', auth, getExpenses)
router.get('/:id', auth, getExpense)
router.put('/:id', auth,updateExpense)
router.delete('/', auth, deleteExpense)


module.exports = router
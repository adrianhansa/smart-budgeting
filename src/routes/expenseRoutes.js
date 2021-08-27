const router = require('express').Router()
const {createExpense,getExpenses,getExpense,updateExpense,deleteExpense,getExpensesByAccount,getExpensesByMonthAndYear} = require('../controllers/expensesController')
const auth = require('../middlewares/auth')

router.post('/', auth, createExpense)
router.get('/', auth, getExpenses)
router.get('/:id', auth, getExpense)
router.put('/:id', auth,updateExpense)
router.delete('/:id', auth, deleteExpense)
router.get('/:month/:year',auth,getExpensesByMonthAndYear)
router.get('/:account',auth,getExpensesByAccount)


module.exports = router
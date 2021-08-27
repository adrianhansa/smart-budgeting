const router = require('express').Router()
const {createExpense,getExpenses,getExpense,updateExpense,deleteExpense} = require('../controllers/expensesController')

router.post('/', createExpense)
router.get('/', getExpenses)
router.get('/:id', getExpense)
router.put('/:id',updateExpense)
router.delete('/', deleteExpense)


module.exports = router
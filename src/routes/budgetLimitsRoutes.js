const router = require('express').Router()
const {createBudgetLimit,getBudgetLimit,updateBudgetLimit,deleteBudgetLimit} = require('../controllers/budgetLimitsController')
const auth = require('../middlewares/auth')

router.post('/:account', auth, createBudgetLimit)
router.get('/:account/:id', auth, getBudgetLimit)
router.put('/:account/:id', auth, updateBudgetLimit)
router.delete('/:account/:id', auth, deleteBudgetLimit)

module.exports = router
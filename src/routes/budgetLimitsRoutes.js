const router = require("express").Router();
const {
  createBudgetLimit,
  getBudgetLimit,
  updateBudgetLimit,
  deleteBudgetLimit,
  getBudgetLimits,
} = require("../controllers/budgetLimitsController");
const auth = require("../middlewares/auth");

router.post("/", auth, createBudgetLimit);
router.get("/:id", auth, getBudgetLimit);
router.put("/:id", auth, updateBudgetLimit);
router.delete("/:id", auth, deleteBudgetLimit);
router.get("/:month/:year", auth, getBudgetLimits);

module.exports = router;

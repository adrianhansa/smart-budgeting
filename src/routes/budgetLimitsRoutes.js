const router = require("express").Router();
const {
  createBudgetLimit,
  getBudgetLimit,
  updateBudgetLimit,
  deleteBudgetLimit,
  getBudgetLimits,
} = require("../controllers/budgetLimitsController");
const auth = require("../middlewares/auth");

router.get("/", auth, getBudgetLimits);
router.post("/", auth, createBudgetLimit);
router.get("/:id", auth, getBudgetLimit);
router.put("/:id", auth, updateBudgetLimit);
router.delete("/:id", auth, deleteBudgetLimit);

module.exports = router;

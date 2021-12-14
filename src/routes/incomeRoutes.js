const router = require("express").Router();
const {
  createIncome,
  getIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
  getIncomesByAccount,
  getIncomesByMonthAndYear,
} = require("../controllers/incomeController");
const auth = require("../middlewares/auth");

router.post("/", auth, createIncome);
router.get("/", auth, getIncomes);
router.get("/:id", auth, getIncome);
router.put("/:id", auth, updateIncome);
router.delete("/:id", auth, deleteIncome);
router.get("/:month/:year", auth, getIncomesByMonthAndYear);
router.get("/:account", auth, getIncomesByAccount);

module.exports = router;

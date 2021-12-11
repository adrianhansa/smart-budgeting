const router = require("express").Router();
const {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountsController");
const auth = require("../middlewares/auth");

router.post("/", auth, createAccount);
router.get("/", auth, getAccounts);
router.get("/:id", auth, getAccount);
router.put("/:id", auth, updateAccount);
router.delete("/:id", auth, deleteAccount);

module.exports = router;

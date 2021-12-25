const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  addSaving,
  getSaving,
  getSavings,
} = require("../controllers/savingsController");

router.post("/", auth, addSaving);
router.get("/", auth, getSavings);
router.get("/:id", auth, getSaving);

module.exports = router;

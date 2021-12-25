const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  addSaving,
  getSaving,
  getSavings,
  deleteSaving,
  updateSaving,
} = require("../controllers/savingsController");

router.post("/", auth, addSaving);
router.get("/", auth, getSavings);
router.get("/:year/:month", auth, getSaving);
router.put("/:id", auth, updateSaving);
router.delete("/:id", auth, deleteSaving);

module.exports = router;

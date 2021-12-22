const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getEvents,
  deleteEvent,
  archiveEvent,
} = require("../controllers/eventsController");

router.get("/", auth, getEvents);
router.delete("/:id", auth, deleteEvent);
router.put("/:id", auth, archiveEvent);

module.exports = router;

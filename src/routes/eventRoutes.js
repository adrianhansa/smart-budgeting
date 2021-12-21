const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getEvents, deleteEvent } = require("../controllers/eventsController");

router.get("/", auth, getEvents);
router.delete("/:id", auth, deleteEvent);

module.exports = router;

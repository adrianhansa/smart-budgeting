const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getEvents } = require("../controllers/eventsController");

router.get("/", auth, getEvents);

module.exports = router;

const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    if (!req.user.admin) {
      return res.status(401).json({
        message: "You are not authorized to retrieve this information.",
      });
    }
    const events = await Event.find({ household: req.user.household._id });
    res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents };

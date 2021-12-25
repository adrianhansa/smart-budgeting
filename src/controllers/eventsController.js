const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      household: req.user.household._id,
      read: false,
    }).populate("user", "name");
    res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(401).json({
        message: "You are not authorized to delete this record.",
      });
    }
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const archiveEvent = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(401).json({
        message: "You are not authorized to archive this record.",
      });
    }
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!event) {
      return res.status(404).json(event);
    }
    res.status(200).json({ message: "Event archived" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, deleteEvent, archiveEvent };

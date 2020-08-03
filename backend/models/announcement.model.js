const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  classCode: { type: String, required: true },
  announcements: { type: Array },
});

module.exports = mongoose.model("Announcement", announcementSchema);

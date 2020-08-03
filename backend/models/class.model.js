const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  adminId: { type: String, required: true },
  className: { type: String, required: true },
  classCode: { type: String, required: true, unique: true },
  subject: { type: String },
  students: { type: [String], unique: true },
  announcementId: { type: String, unique: true },
  studentsPost: { type: Array },
});

module.exports = mongoose.model("Class", classSchema);

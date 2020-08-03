const Class = require("../models/class.model");
const Announcement = require("../models/announcement.model");

const classCodeGenerator = () => {
  let code = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let length = characters.length;
  for (let i = 0; i < 7; i++)
    code += characters.charAt(Math.floor(Math.random() * length));
  return code;
};

exports.classes = (req, res) => {
  Class.find({ students: userId })
    .then((classes) => {
      if (classes < 1)
        return res.status(200).json({ message: "Not in any class" });
      res.status(200).json([classes]);
    })
    .catch(() => {
      return res.status(400).json({ error: "Error Occured!" });
    });
};

exports.createClass = (req, res) => {
  classCode = classCodeGenerator();
  let newAnnouncement = new Announcement({
    classCode: classCode,
  });
  newAnnouncement
    .save()
    .then(() => console.log(`AnnouncementID: ${newAnnouncement._id}`))
    .catch(() => {
      return res.status(400).json({ error: "Error Occured. Try Again" });
    });
  let announcementId = newAnnouncement._id;
  let newClass = new Class({
    adminId: req.userData.userId,
    className: req.body.className,
    subject: req.body.subject,
    classCode: classCode,
    announcementId: announcementId,
  });
  newClass
    .save()
    .then(() => {
      return res
        .status(200)
        .json({ message: "Class Created Successfully", classCode: classCode });
    })
    .catch(() => {
      return res.status(400).json({ error: "Error Occured. Try Again" });
    });
};

exports.singleClass = (req, res) => {
  Class.find({ classCode: req.params.classCode }).then((room) => {
    if (room.length < 1) {
      return res.status(404).json({ error: "Class Not Found" });
    }
    return res.status(200).json({
      message: "Class Found",
      details: room,
    });
  });
};

exports.joinClass = (req, res) => {
  const classCode = req.body.classCode;
  const userId = req.userData.userId;
  let flag = 1;
  Class.findOne({ classCode: classCode }).then((theClass) => {
    if (theClass < 1) {
      return res.status(404).json({ message: "Invalid Class Code" });
    }
    theClass.students.map((studentId) => {
      if (studentId === userId) {
        flag = 0;
        return res.status(400).json({ message: "User already in the class!" });
      }
    });
    if (flag) {
      Class.findOneAndUpdate(
        { classCode: classCode },
        { $push: { students: userId } },
        (err, success) => {
          if (err) return res.status(400).json({ message: "Error Occured" });
          return res.status(200).json({ message: "Added to class" });
        }
      );
      flag = 1;
    }
  });
};

exports.displayStudents = (req, res) => {
  const classCode = req.params.classCode;
  Class.findOne({ classCode: classCode }).then((classDetail) => {
    if (classDetail < 1)
      return res.json(400).json({ message: "Invalid ClassCode" });
    return res.status(200).json({
      message: `Displaying Details of Student in the Class with Code: ${classCode}`,
      students: classDetail.students,
    });
  });
};

exports.announcement = (req, res) => {
  const classCode = req.params.classCode;
  let announcement = {
    title: req.body.title,
    content: req.body.content,
    assignment: req.body.assignment,
    due: req.body.due,
  };
  Announcement.findOne({ classCode: classCode }).then((theAnnouncement) => {
    if (theAnnouncement < 1)
      return res.status(400).json({ error: "Invalid Class Code" });
    Announcement.findOneAndUpdate(
      { classCode: classCode },
      { $push: { announcements: announcement } },
      (err, success) => {
        if (err) return res.status(400).json({ error: "Error Occured!" });
        return res.status(200).json({ message: "Announcement made!" });
      }
    );
  });
};

exports.posts = (req, res) => {
  const classCode = req.params.classCode;
  Class.findOne({ classCode: classCode }).then((theClass) => {
    if (theClass < 1)
      return res.status(200).json({ message: "Invalid Class Code!" });
    let announcementId = theClass.announcementId;
    Announcement.findOne({ _id: announcementId }).then((announcements) => {
      if (announcements < 1)
        return res.status(400).json({ error: "No Announcements Yet!" });
      return res.status(200).json({ announcements: announcements });
    });
  });
};

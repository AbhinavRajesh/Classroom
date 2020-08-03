const Class = require("../models/class.model");

module.exports = (res, req, next) => {
  console.log(req.userData);
  const userId = req.userData.userId;
  const classCode = req.params.classCode;
  Class.findOne({ classCode: classCode }).then((theClass) => {
    if (theClass < 1)
      return res.status(400).json({ message: "Invalid Class!" });
    else {
      if (theClass.adminId === userId) next();
      else return res.status(400).json({ message: "Not an Admin!" });
    }
  });
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

exports.signIn = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.body.password === req.body.cpassword) {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) return res.json({ error: "User with given email id exists!" });
      else {
        newUser
          .save()
          .then((result) => console.log(result))
          .catch((err) => console.log(`ERROR : ${err}`));
        res.status(200).json({
          message: "User Created with details",
          details: newUser,
        });
      }
    });
  } else {
    res.send({ Error: "Password do not match" });
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user < 1) {
      return res.status(400).json({ error: "Authentication failed" });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) return res.status(401).json({ error: "Authentication failed" });
      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          "secretkey",
          {
            expiresIn: "24h",
          }
        );
        return res
          .status(200)
          .json({ message: "Authentication Successfull", token: token });
      }
      res.status(401).json({ error: "Authentication failed" });
    });
  });
};

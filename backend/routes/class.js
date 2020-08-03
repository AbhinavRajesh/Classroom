const router = require("express").Router();

const {
  classes,
  createClass,
  singleClass,
  joinClass,
  displayStudents,
  announcement,
  posts,
} = require("../controllers/class");

const checkAuth = require("../middleware/checkAuth");
const checkAdmin = require("../middleware/checkAdmin");

router.get("/", checkAuth, classes);
router.post("/create", checkAuth, createClass);
router.post("/join", checkAuth, joinClass);
router.get("/:classCode", checkAuth, singleClass);
router.post("/:classCode/announcement", checkAuth, announcement);
router.get("/:classCode/students", checkAuth, displayStudents);
router.get("/:classCode/posts", checkAuth, posts);

module.exports = router;

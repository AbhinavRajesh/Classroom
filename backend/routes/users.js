const router = require("express").Router();

const { signIn, login } = require("../controllers/user");

router.post("/signin", signIn);
router.post("/login", login);

module.exports = router;

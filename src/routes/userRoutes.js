const router = require("express").Router();
const {
  register,
  login,
  deleteAccount,
  logout,
  addUser,
  deleteUser,
} = require("../controllers/usersControllers");

const auth = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/add-user", auth, addUser);
router.delete("/delete-account", deleteAccount);
router.delete("/delete-user/:id", auth, deleteUser);
router.get("/logout", logout);

module.exports = router;

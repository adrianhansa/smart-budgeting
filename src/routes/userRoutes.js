const router = require("express").Router();
const {
  register,
  login,
  deleteAccount,
  logout,
  addUser,
  deleteUser,
  getUsers,
} = require("../controllers/usersControllers");

const auth = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/add-user", auth, addUser);
router.delete("/delete-account", deleteAccount);
router.delete("/delete-user/:id", auth, deleteUser);
router.get("/logout", logout);
router.get("/users", auth, getUsers);

module.exports = router;

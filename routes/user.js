const userController = require("../controllers/userController"); 

const router = require("express").Router(); 

router.get("/", userController.Login); 

router.post("/", userController.Signup); 

router.delete("/:userid", userController.DeleteUser);

router.patch("/changepassword", userController.ChangePassword); 

module.exports = router; 
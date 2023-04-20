const userController = require("../controllers/userController"); 

const router = require("express").Router(); 

router.get("/", userController.login); 

router.post("/", userController.signup); 

router.delete("/:userid", userController.deleteuser);

router.patch("/changepassword", userController.changepassword); 

module.exports = router; 
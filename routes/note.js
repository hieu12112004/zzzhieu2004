import noteController from '../controllers/noteController';
import authenticateController from '../controllers/MiddleWareController';
// import noteController from '@controllers/noteController';
const router = require("express").Router();  

// Make a note
router.all("*", authenticateController.verifytoken);
// GET /note/* Regex
router.post("/", noteController.create); 

// Get all note
router.get("/",noteController.GetAllNote); 

// Get all notes from a user 
router.get("/getnote",noteController.getNote); 

// Update a Note
router.put("/:noteid",noteController.updateNote); 

// Delete a Note 
router.delete("/:noteid", noteController.deleteNote); 

module.exports = router; 
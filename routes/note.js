const noteController = require("../controllers/noteController"); 

const router = require("express").Router();  

// Make a note
router.post("/",noteController.Create); 

// Get all note
router.get("/",noteController.GetAllNote); 

// Get all notes from a user 
router.get("/:userid",noteController.GetNote); 

// Update a Note
router.put("/:noteid",noteController.UpdateNote); 

// Delete a Note 
router.delete("/:noteid", noteController.DeleteNote); 

module.exports = router; 
const { model } = require("mongoose");
const { UserModel,NoteModel } = require("../model/model"); 
const noteController = {
    // Make new note: 
    create : async (req, res) => {

        try{
        const userId = req.userId;
        console.log(userId); 
        const userCheck = UserModel.findById(userId); 
        if (!userCheck) {
          throw error("no user match");
        } 

        const note = new NoteModel();
        note.title = req.body.title; 
        note.note = req.body.note; 
        note.userid = userId;  
        // console.log(note); 

        await note.save();
        
          await userCheck.updateOne({$push: { note: note._id}}); 
        res.send({message: `New note created`, note: note });
      } catch (err){
        res.status(500).json(err); 
      }
    }, 


    // Get all notes 
    GetAllNote : async (req, res) => {
      try{
        const checkNote = await NoteModel.find(); 
      
        if (!checkNote) {
          res.send({Message: `No note has been made`})
        }
      
        res.send({Message: `List: `, note: checkNote} );
      }
    catch(err){
      res.status(500).json(err); 
      }
    },
      // Get all note of an username
      getNote: async(req,res) => {
        try{ 
        const userId = req.userId; 
        const findNote = await UserModel.findById(userId).populate("note");  // populate: hiện toàn bộ thông tin về title của findNote
        
        if (!findNote) {
            throw Error('No username match')
        }

        res.status(200).json({Username: findNote.username, Note: findNote.note})
      } catch(err){
        res.status(500).json(err); 
        }
      }, 

      // Update a Note: 
      updateNote : async(req,res) => {
        try {
          const findNote = await NoteModel.findById(req.params.noteid); 
          await findNote.updateOne({$set: req.body}); 
          res.send({Message: 'Update Successfully', Note: req.body}); 
        } catch (err) {
          res.status(500).json(err);
        }
      },

      // Delete a Note: 
      deleteNote : async(req,res) => {
        try {
          await UserModel.updateMany(
            { title: req.params.noteid }, 
            { $pull: { title: req.params.noteid } }
          ); 
          await NoteModel.findByIdAndDelete(req.params.noteid); 
          res.send("Delete successfully"); 
        } catch (err) {
          res.status(500).json(err);
        }
      }

}

module.exports = noteController; 
const { model } = require("mongoose");
const { UserModel,NoteModel } = require("../model/model"); 

const noteController = {
    // Make new note: 
    Create : async (req, res) => {
    
        try{
        const Note = new NoteModel(req.body); 
        const saveNote = await Note.save();
        if (req.body.userid) {
          const userCheck = UserModel.findById(req.body.userid); 
          await userCheck.updateOne({$push: { title: saveNote._id}}); 
        }
        res.send({Message: `New note created` });
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
      GetNote: async(req,res) => {
        try{ 
        const findNote = await UserModel.findById(req.params.userid).populate("title");  // populate: hiện toàn bộ thông tin về title của findNote
        
        if (!findNote) {
            throw Error('No username match')
        }

        res.send({Username: findNote.username, Title: findNote.title})
      } catch(err){
        res.status(500).json(err); 
        }
      }, 

      // Update a Note: 
      UpdateNote : async(req,res) => {
        try {
          const findNote = await NoteModel.findById(req.params.noteid); 
          await findNote.updateOne({$set: req.body}); 
          res.send({Message: 'Update Successfully', Note: req.body}); 
        } catch (err) {
          res.status(500).json(err);
        }
      },

      // Delete a Note: 
      DeleteNote : async(req,res) => {
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
const mongoose = require("mongoose"); 

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true}, 
    email: {
        type: String,
        unique: true, 
    },
    password: { type: String }, 
    title: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"hieuNote"
    }]
})

const NoteSchema = new mongoose.Schema({
  title: { type: String }, 
  note: { type: String },
  userid: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:"hieupractices", 
  } 
})

const UserModel = mongoose.model('hieupractices', UserSchema)
const NoteModel = mongoose.model('hieuNote', NoteSchema) 

module.exports = { UserModel,NoteModel }
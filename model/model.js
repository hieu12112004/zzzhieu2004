import mongoose,{ Schema } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true}, 
    email: {
        type: String,
        unique: true, 
    },
    password: { type: String }, 
    note: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"notes"
    }]
})

const NoteSchema = new Schema({
  title: { type: String }, 
  note: {type: String},
  userid: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:"users", 
  } 
})

const UserModel = mongoose.model('users', UserSchema)
const NoteModel = mongoose.model('notes', NoteSchema) 

module.exports = { UserModel,NoteModel }
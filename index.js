const express = require('express')
const app = express()
const port = 3000
import mongoose, { Schema, mongo } from 'mongoose' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userRoute = require("./routes/user"); 
const noteRoute = require("./routes/note"); 

const saltRounds = 12; 
app.use(express.json()); 


mongoose.connect("mongodb+srv://GDSC:gdscurlshortener123@cluster0.4mncv.mongodb.net/Hieu?authSource=admin&replicaSet=atlas-h2i7y8-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true")
        .then(() => console.log("Xinh đẹp tuyệt vời, chúc ngày mới an lành!"))

app.use("/User", userRoute); 
app.use("/Note", noteRoute); 

app.get('/getAllNote', async (req, res) => {
  const checkUser = await UserModel.find(); 

  console.log(checkUser)
  if (!checkUser) {
    res.send({Message: `No note has been made`})
  }

  res.send({Message: `List`,note: checkUser} )
})


//Tạo note
app.post('/createNote', async (req, res) => {
    const { title,note } = req.body;
    const Note = new NoteModel(); 

    Note.title = title; 
    Note.note = note; 
    //Note.LastUpdate = tgian lúc tạo ...  
    await Note.save();

    res.send({Message: `New note created` });
})

//hiện toàn bộ note
app.post('/getAllNotes', async (req, res) => {
  const checkNote = await NoteModel.find(); 

  if (!checkNote) {
    res.send({Message: `No note has been made`})
  }

  res.send({Message: `List`, note: checkNote} )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); 


const app = express(); 
const port = 3000
import mongoose, { Schema, mongo } from 'mongoose' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// const userRoute = require("./routes/user"); 
// const noteRoute = require("./routes/note"); 

import routes from './routes';

dotenv.config(); 
const saltRounds = 12; 
app.use(express.json()); 


mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("Xinh đẹp tuyệt vời, chúc ngày mới an lành!"))

// app.use("/user", routes.user); 
// app.use("/note", routes.note); 
// for (const [key, value] of Object.entries(routes)) {
//   console.log(`${key}: ${value}`);
//   app.use(`/${key}`, value);
// }
routes.map(e=>{
  app.use(e.path, e.route);
})
// -> app.use 




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
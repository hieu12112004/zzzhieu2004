const { model } = require("mongoose");
const { UserModel,NoteModel } = require("../model/model"); 

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const saltRounds = 12;
const SECRET = "Hieudeptrai"; 

const userController = {

    Hi : (req,res) => {
        res.send(`Hello Bitch`)
    }, 

    //Create a new account: 
    Signup :  async (req, res) => {
        try {
          var { username,password } = req.body; 
        const user = new UserModel();
        user.username = username; 
        user.password = await bcrypt.hash(password, saltRounds); 
      
        await user.save();
      
        if (!username || !password) {
          throw Error(`Chưa nhập Tài Khoản hoặc Mật Khẩu !`)
        }
      
        const isCheck = await UserModel.findOne(); 
        if (!isCheck){
          throw Error(`User Account has been existed, plz try new one`)
        }
      
        res.send({Message: 'Sign up successfully', user: user}); 
        } catch (error) {
          res.send(error.message) 
        }
      },

    // Login into an username 
    Login : async (req, res) => {
        try{
        const { username,password } = req.body; 
  
        if (!username || !password) {
          throw Error("No username or password")
        }
  
        const users = await UserModel.findOne({username: username}).populate("title"); 
        if (!users){
          throw Error(`No username match`)
        }
        
          let isMatch = await bcrypt.compare(password, users.password)
        if (!isMatch){
          throw Error('Wrong password')
        }
        const token = jwt.sign({
          data: {
              userId: users._id
          }
      }, SECRET, { expiresIn: 60*60*24});

        res.send({Message: 'Login successfully', usersname: users, token: token})
      } catch (error) {
        res.send(error.message) 
      }
  },

  // Change password: 
    ChangePassword : async (req, res) => {
      try {
        const { newPassword } = req.body
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
    
        const decoded = jwt.verify(token, SECRET);
        const { userId } = decoded.data;
        const user = await UserModel.findById(userId);
        if (!user) throw Error("User not exist");
        user.password = await bcrypt.hash(newPassword, saltRounds);
        user.save();
        res.send(`Change PassWord successfully`); 
      } catch (err) {
        res.status(200).json({Message: err})
      }
        
    },

  // Delete an user: 
    DeleteUser: async(req, res) => {
        try {
          const check = await UserModel.findById(req.params.userid); 
          if (!check) throw Error("User not exist"); 
          var length = check.title.length; 
          for (let i=0; i<length; i++){
            await NoteModel.findByIdAndDelete(check.title[i]);
          }

          // await NoteModel.updateMany({userid: req.params.userid}, {userid: null}); 
          await UserModel.findByIdAndDelete(req.params.userid);
          res.send(`Delete successfully`);  
        } catch (err) {
          res.status(500).json(err); 
        }
    }

}; 

module.exports = userController; 
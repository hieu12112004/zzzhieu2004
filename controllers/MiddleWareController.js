const jwt = require("jsonwebtoken")

const middlewareController = {
    
    verifytoken: (req,res,next) => {
        const token = req.header.token; 
        if (token){ 
            // Bear <token> 
            const accesstoken = token.split(" ")[1];
            jwt.verify(accesstoken, process.env.JWT_ACCESS_KEY, (err,user)=>{
                if (err){
                    res.status(403).json("Token is not valid"); 
                }
                req.user = user; 
                next(); 
            }); 
        }
        else{
            res.status(401).json("You're not authenticated"); 
        }
    }
}

module.exports = middlewareController; 
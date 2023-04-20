import jwt from "jsonwebtoken"; 
const middlewareController = {
    
    verifytoken: (req,res,next) => {
        const token = req.headers.authorization; 
        if (token){ 
            // Bear <token> 
            const accesstoken = token.split(" ")[1];
            jwt.verify(accesstoken, process.env.JWT_ACCESS_KEY, (err,user)=>{
                if (err){
                    res.status(403).json("Token is not valid"); 
                }
                // console.log(user);
                // if(Date.now() > user.exp) // ... token expired
                //Expired time -> Xem coi token con thoi han ko 
                req.userId = user.data.userId; 
                next(); 
            }); 
        }
        else{
            res.status(401).json("You're not authenticated"); 
        }
    }
}

module.exports = middlewareController; 

const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()



//req handler for user/auhtor registration
const createUserOrAdmin = async (req, res) => {
  //get users and admins collecion object
  const usersCollectionObj = req.app.get("usersCollection");
  const adminsCollectionObj = req.app.get("adminsCollection");

  //get user or autrhor
  const user = req.body;

  //check duplicate user
  if (user.userType === "user") {
    //find user by usersname
    let dbuser = await usersCollectionObj.findOne({ username: user.username });
    //if user existed
    if (dbuser !== null) {
     return res.send({ message: "Username already existed" });
    }
  }
  //check duplicate admin
  if (user.userType === "admin") {
     //find user by usersname
     let dbuser = await adminsCollectionObj.findOne({ username: user.username });
     //if user existed
     if (dbuser !== null) {
      return res.send({ message: "username already existed" });
     }
  }

  //hash password
    const hashedPassword=await bcryptjs.hash(user.password,7)
    //replace plain pw with hashed pw
    user.password=hashedPassword;

    //save user
    if(user.userType==='user'){
        await usersCollectionObj.insertOne(user)
        res.send({message:"User created"})
    }
    //save admin
      //save user
      if(user.userType==='admin'){
        await adminsCollectionObj.insertOne(user)
        res.send({message:"admin created"})
    }

};

const userOrAdminLogin = async(req, res) => {
     //get users and admins collecion object
  const usersCollectionObj = req.app.get("usersCollection");
  const adminsCollectionObj = req.app.get("adminsCollection");

  //get user or autrhor
  const userCred = req.body;
  //verifuy username of user
  if(userCred.userType==='user'){
    let dbuser=await usersCollectionObj.findOne({username:userCred.username})
    if(dbuser===null){
        return res.send({message:"Invalid username"})
    }else{
        let status=await bcryptjs.compare(userCred.password,dbuser.password)
       // console.log("status",status)
        if(status===false){
            return res.send({message:"Invalid password"})
        }
        else{
            //create token
           const signedToken= jwt.sign({username:dbuser.username},"2",{expiresIn:"1h"})
           delete dbuser.password;
           res.send({message:"login success",token:signedToken,user:dbuser})
        }
    }
  }
  //verify username of admin
  if(userCred.userType==='admin'){
    let dbuser=await adminsCollectionObj.findOne({username:userCred.username})
    if(dbuser===null){
        return res.send({message:"Invalid username"})
    }else{
        let status=bcryptjs.compare(userCred.password,dbuser.password)
        if(status===false){
            return res.send({message:"Invalid password"})
        } else{
            //create token
           const signedToken= jwt.sign({username:dbuser.username},"2",{expiresIn:50})
           delete dbuser.password;
           res.send({message:"login success",token:signedToken,user:dbuser})
        }
    }
  }



};

module.exports = {createUserOrAdmin,userOrAdminLogin};
const exp=require('express');
const adminApp=exp.Router();
const expressAsynHandler=require('express-async-handler');
const {createUserOrAdmin,userOrAdminLogin}=require('./Util');
let usersCollection;
let adminsCollection;
adminApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection');
    adminsCollection=req.app.get('adminsCollection');
    next();
})


// Admin Registration
adminApp.post('/register',expressAsynHandler(createUserOrAdmin));



// Admin Login
adminApp.post('/login',expressAsynHandler(userOrAdminLogin));



module.exports=adminApp;
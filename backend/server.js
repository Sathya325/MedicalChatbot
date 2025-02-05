const exp=require("express")
const app=exp();
const path=require('path');
const OpenAI=require("openai");
// const cors = require('cors');

require("dotenv").config();
// body parser
// app.use(cors());
app.use(exp.json())



const mongoClient=require("mongodb").MongoClient;
app.use(exp.static(path.join(__dirname,'../frontend/build')));

// connect to mongodb server
mongoClient
    .connect(process.env.MONGO_URL)
    .then((client)=>{
        // get database object
        const amdsObj=client.db("amds");
        // creating collection objects
        const usersCollection=amdsObj.collection("users")
        const adminsCollection=amdsObj.collection("admins")
        const remindersCollection=amdsObj.collection("reminders")


        // share the collection with APIs
        app.set("usersCollection",usersCollection);
        app.set("adminsCollection",adminsCollection);
        app.set("remindersCollection",remindersCollection);
        console.log("DATABASE CONNECTION SUCCESS")
    })
    .catch((err)=>console.log("DATABASE CONNECTION ERROR",err));


    // import APIs
    const userApp=require("./APIs/user-api");
    const adminApp=require("./APIs/admin-api");
    // const reminderApp=require("./APIs/reminders")




    // handover requests to APIs
    app.use("/user",userApp);
    app.use("/admin",adminApp);


    //error handling middeware
app.use((err, req, res, next) => {
    res.send({ status: "error", message: err.message});
  });



  const port=4000;


//   assign port number
app.listen(port,()=>console.log("SERVER IS LISTENING ON PORT NUMBER 4000"));

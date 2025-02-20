const express = require("express");
const userApp = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { createUserOrAdmin, userOrAdminLogin } = require("./Util");
const OpenAI = require('openai');

let usersCollection;
let adminsCollection;
let Reminder;

userApp.use((req, res, next) => {
    usersCollection = req.app.get('usersCollection');
    adminsCollection = req.app.get('adminsCollection');
    Reminder = req.app.get("remindersCollection");
    next();
});


// User registration
userApp.post('/register', expressAsyncHandler(createUserOrAdmin));

// User login
userApp.post("/login", expressAsyncHandler(userOrAdminLogin));


module.exports = userApp;

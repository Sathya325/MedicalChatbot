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

// Chat endpoint with system prompt
userApp.post('/chat', async (req, res) => {
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY // Ensure API key is stored in environment variable
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "openai/gpt-3.5-turbo-1106",
            messages: [
                // System message to define the assistant's role or behavior
                { 
                    role: "system", 
                    content: "You are a knowledgeable medical diagnosis assistant designed to help users by analyzing their symptoms and offering possible diagnoses and remedies. When a user describes their symptoms, your task is to first identify and suggest probable diseases or conditions based on the symptoms provided. Then, you should recommend suitable remedies or actions that can help alleviate the symptoms. Additionally, you should advise the user when it is important to consult a healthcare professional, especially if the symptoms are severe or have persisted for an extended period. Provide clear and simple medical guidance."
                },
                // User message
                { 
                    role: "user", 
                    content: "Say this is a test" 
                }
            ]
        });

        // Send the assistant's response to the user
        res.send(completion.choices[0].message.content);
    } catch (error) {
        console.log("Error during completion request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = userApp;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chatbot.css';

function Chatbot() {
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const chatEndRef = useRef(null);

    async function generateAnswer(e) {
        e.preventDefault();
        setGeneratingAnswer(true);

        const userMessage = { type: 'user', text: question };
        setChatHistory(prevHistory => [...prevHistory, userMessage]);
        setQuestion("");

        try {
            const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
            if (!apiEndpoint) {
                throw new Error('API Endpoint is not defined');
            }
            // Add system prompt to contextualize the API response
            const systemPrompt = "NOTE: If the input you receive after this note is related to Medical accordingly, or if the user input is not upto the mark you need to give the response that includes the home remedies, precautions need to be taken before consulting a doctor and advice to consult a doctor if necessary. Otherwise, give output as Invalid Input and ask for medical input.";
            const contextualQuestion = `${systemPrompt} ${question}`;

            const response = await axios({
                url: apiEndpoint,
                method: "post",
                data: {
                    contents: [{ parts: [{ text: contextualQuestion }] }],
                },
            });
            console.log(response);
            const botMessage = {
                type: 'bot',
                content: response.data.candidates[0].content.parts[0].text,
            };

            setChatHistory(prevHistory => [...prevHistory, botMessage]);
        } catch (error) {
            console.error('Error during API request:', error);
            const errorMessage = {
                type: 'bot',
                content: "Sorry, something went wrong. Please try again.",
            };
            setChatHistory(prevHistory => [...prevHistory, errorMessage]);
        }
        setGeneratingAnswer(false);
    }

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    return (
        <div className='chat-container'>
            <header className='chat-header'>
                <h1>CHATBOT</h1>
            </header>
            <main className='chat-main'>
                <div className='chat-box'>
                    {chatHistory.map((message, index) => (
                        <div key={index} className={message.type}>
                            {message.type === 'bot' ? (
                                <div className="bot-response">
                                    {message.content.split('\n').map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            ) : (
                                <p>{message.text}</p>
                            )}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
            </main>
            <footer className='chat-footer'>
    <form className='chat-input' onSubmit={generateAnswer}>
        <textarea
            placeholder="Enter your message"
            className='chat-textarea'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
        />
        <button
            className='chat-button'
            type='submit'
            disabled={generatingAnswer}
        >
            {generatingAnswer ? (
                <span>...</span>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M2,21l21-9L2,3v7l15,2L2,17V21z" />
                </svg>
            )}
        </button>
    </form>
</footer>

        </div>
    );
}

export default Chatbot;

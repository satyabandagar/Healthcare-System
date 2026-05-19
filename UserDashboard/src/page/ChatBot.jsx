import React, { useState } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Welcome 👋How can I help with your health today? "
    },
  ]);

  const [input, setInput] = useState("");

  const API_KEY = "";

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = input;

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: "Typing...",
      },
    ]);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },

          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",

            messages: [
              {
  role: "system",
  content: `
    You are a multilingual Healthcare AI Assistant.

    Only answer healthcare and medical related questions.

    Reply in the same language used by the user.

    Supported languages:
    - English
    - Marathi
    - Hindi

    If the user asks anything unrelated to healthcare,
    reply in the user's language saying that
    you can only help with healthcare questions.

    Keep answers short, simple, and helpful.
  `
},

              {
                role: "user",
                content: currentMessage,
              },
            ],
          }),
        },
      );

      const data = await response.json();

      let reply = "API Error";

      if (data.choices && data.choices.length > 0) {
        reply = data.choices[0].message.content;
      }

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "bot",
          text: reply,
        };

        return updated;
      });
    } catch (error) {
      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "bot",
          text: "Error connecting to AI.",
        };

        return updated;
      });
    }
  };

  return (
    <>
      <div className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        🤖
      </div>

      <div className={`chat-container ${isOpen ? "show" : ""}`}>
        <div className="chat-header" style={{ backgroundColor: "#bab5b5e1" }}>
          <span style={{ color: "black" }}>AI Chatbot</span>

          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            style={{ width: "50px", height: "40px", backgroundColor: "#333" }}
          >
            ✖
          </button>
        </div>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-area" style={{ display: "flex", width: "100%" }}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{
              width: "500px",
              height: "50px",
              padding: "10px",
              borderRadius: "10px",
              margin: "10px",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              width: "80px",
              backgroundColor: "#46b948",
              position: "absolute",
              left: "170px",
              bottom: "15px",
              height: "40px",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBot;

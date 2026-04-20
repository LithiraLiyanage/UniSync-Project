import React, { useState } from "react";
import FeatureNav from "./FeatureNav";

const initialMessages = [
  { id: 1, sender: "Nimal", text: "Hey, are you coming to the AI Workshop?" },
  { id: 2, sender: "You", text: "Yes, I’m planning to join!" },
  { id: 3, sender: "Kasun", text: "Let’s meet before the event starts." },
];

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: input,
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Event Chat</h1>
        <p className="text-slate-500 mt-2">
          Connect and chat with people attending your events
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                msg.sender === "You"
                  ? "ml-auto bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              <p className="text-xs font-semibold mb-1">{msg.sender}</p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-slate-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
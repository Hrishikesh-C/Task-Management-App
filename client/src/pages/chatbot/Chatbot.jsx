import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function ChatBot() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const updatedChat = [...chat, userMessage];

    setChat(updatedChat);
    setInput('');
    setIsBotTyping(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/chat`, {
        chatHistory: updatedChat,
      });

      if (res.data?.reply) {
        const botMessage = { sender: 'bot', text: res.data.reply };
        setChat(prev => [...prev, botMessage]);
      } else {
        setChat(prev => [...prev, { sender: 'bot', text: "⚠️ No reply from server." }]);
      }

    } catch (err) {
      console.error("Chatbot error:", err);
      setChat(prev => [...prev, { sender: 'bot', text: "⚠️ Error: Please try again later." }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, isBotTyping]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-tl from-[#0F172A] via-[#1E293B] to-[#3B82F6]">

      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-white mb-4 tracking-tight">
        Your Smart Task Assistant <br />
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
          Organize. Prioritize. Accomplish.
        </span>
      </h1>

      {/* Subheader */}
      <p className="text-center text-gray-200 max-w-xl mb-8">
        Manage tasks, set reminders, track progress — all through conversation.
      </p>

      {/* Chat Container */}
      <div className="w-full max-w-5xl flex flex-col h-[70vh] bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-6 overflow-hidden">
        
        <div className="flex-1 overflow-y-auto space-y-4 p-4 custom-scrollbar">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                msg.sender === 'user'
                  ? 'ml-auto text-right bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'bg-white/80 text-gray-800 border border-gray-200 shadow-md'
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}

          {isBotTyping && (
            <div className="text-indigo-400 text-sm font-semibold px-3 py-1">
              Bot is typing<span className="animate-pulse">...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Enter your task or question..."
            className="flex-1 p-4 rounded-full bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default ChatBot;

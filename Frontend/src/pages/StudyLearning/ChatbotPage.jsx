import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCpu, FiUser, FiZap } from 'react-icons/fi';

const suggestedQuestions = [
  "Explain Dijkstra's algorithm simply",
  "How to design a normalized database?",
  "Create a study schedule for finals",
  "Summarize OSI model layers"
];

const mockReplies = [
  "That's a great question! Dijkstra's algorithm finds the shortest path between nodes in a graph. Imagine finding the fastest route on a map.",
  "To normalize a database, you reduce data redundancy and improve data integrity. Start with 1NF (atomic values), then 2NF (remove partial dependencies), and 3NF.",
  "I've analyzed your progress. Since Networks is your weakest module (44%), I recommend dedicating 2 extra hours to it on weekends. I can generate a full calendar if you like.",
  "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Think of 'Please Do Not Throw Sausage Pizza Away'."
];

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello! I'm your UniSync AI Study Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [replyIndex, setReplyIndex] = useState(0);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e, customText = null) => {
    if (e) e.preventDefault();
    const text = customText || input;
    if (!text.trim()) return;

    const newMsg = { id: Date.now(), sender: 'user', text: text.trim() };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and replying
    setTimeout(() => {
      const aiReply = { id: Date.now() + 1, sender: 'ai', text: mockReplies[replyIndex % mockReplies.length] };
      setMessages(prev => [...prev, aiReply]);
      setReplyIndex(prev => prev + 1);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px] animate-fade-in pb-10">
      
      {/* Left Area: Chat Iterface */}
      <div className="flex-1 bg-[#0f172a] border border-[#1e3a5f] rounded-xl shadow-lg flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="bg-[#1e3a5f] border-b border-[#2a4a7f] p-4 flex items-center text-white">
          <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 border border-primary/30">
            <FiCpu size={28} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-text">UniSync Study AI</h2>
            <p className="text-xs text-green flex items-center font-semibold"><span className="w-2 h-2 rounded-full bg-green mr-1.5 animate-pulse"></span>Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0a0f1e]">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-[#1e3a5f] text-blue-300 ml-2' : 'bg-[#2563eb] text-white mr-2 shadow-md shadow-blue-900/50'}`}>
                    {msg.sender === 'user' ? <FiUser size={14} /> : <FiCpu size={14} />}
                  </div>
                  
                  <div className={`p-3.5 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-[#2563eb] text-white rounded-tr-none' : 'bg-[#131c2e] border border-[#1e3a5f] text-slate-200 rounded-tl-none'}`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex justify-start">
              <div className="flex flex-row">
                <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center mr-2 shadow-sm"><FiCpu size={14} /></div>
                <div className="p-4 rounded-2xl bg-[#131c2e] border border-[#1e3a5f] rounded-tl-none flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#0f172a] border-t border-[#1e3a5f]">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your studies..."
              className="w-full pl-5 pr-14 py-3.5 bg-[#0a0f1e] border border-[#1e3a5f] rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 shadow-inner text-slate-200 placeholder-slate-500 text-sm transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 bg-[#2563eb] text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm focus:outline-none"
            >
              <FiSend size={18} className="translate-x-0.5 -translate-y-0.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Area: Sidebar Suggestions */}
      <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
        <div className="bg-[#0f172a] border border-[#1e3a5f] rounded-xl p-5 shadow-lg">
          <h3 className="font-bold text-text mb-4 flex items-center text-md">
            <FiZap className="mr-2 text-amber" /> Suggested Questions
          </h3>
          <div className="space-y-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(null, q)}
                disabled={isTyping}
                className="w-full text-left p-3 rounded-lg border border-[#1e3a5f] bg-[#0a0f1e] text-slate-300 hover:border-blue-500 hover:bg-blue-500/10 transition-all focus:outline-none"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f172a] border border-blue-500/20 rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-text mb-2 text-md">How I can help?</h3>
          <ul className="space-y-2 text-xs text-slate-400 list-disc pl-4">
            <li>Generate study timetables based on your progress.</li>
            <li>Explain complex concepts (DSA, Math).</li>
            <li>Find relevant past paper questions.</li>
            <li>Analyze your weak subjects and suggest resources.</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default ChatbotPage;

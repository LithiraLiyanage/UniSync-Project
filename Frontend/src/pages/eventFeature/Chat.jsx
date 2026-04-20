import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiSearch, FiMoreVertical, FiPaperclip, FiSmile, FiPhone, FiVideo, FiUsers, FiSettings, FiX } from "react-icons/fi";
import FeatureNav from "./FeatureNav";

const initialChats = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
    lastMessage: "Hey! Are you coming to the AI Workshop?",
    time: "2:30 PM",
    unread: 2,
    online: true,
    typing: false,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    lastMessage: "Thanks for sharing the notes!",
    time: "1:15 PM",
    unread: 0,
    online: true,
    typing: false,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    lastMessage: "Let's collaborate on the project",
    time: "12:45 PM",
    unread: 1,
    online: false,
    typing: false,
  },
  {
    id: 4,
    name: "Study Group - CS401",
    avatar: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=150&q=80",
    lastMessage: "Meeting tomorrow at 3 PM",
    time: "11:30 AM",
    unread: 5,
    online: true,
    typing: true,
    isGroup: true,
  },
  {
    id: 5,
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    lastMessage: "Great presentation today!",
    time: "Yesterday",
    unread: 0,
    online: false,
    typing: false,
  },
];

const initialMessages = [
  { id: 1, sender: "Sarah Chen", text: "Hey! Are you coming to the AI Workshop?", time: "2:25 PM", isMe: false },
  { id: 2, sender: "You", text: "Yes! I'm really excited about it. Have you registered?", time: "2:26 PM", isMe: true },
  { id: 3, sender: "Sarah Chen", text: "Yep! Already registered. Should we sit together?", time: "2:28 PM", isMe: false },
  { id: 4, sender: "You", text: "That would be great! Let's meet 15 minutes before it starts", time: "2:30 PM", isMe: true },
  { id: 5, sender: "Sarah Chen", text: "Perfect! See you there 🎉", time: "2:30 PM", isMe: false },
];

const Chat = () => {
  const [chats, setChats] = useState(initialChats);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      // Mark messages as read
      setChats(chats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, unread: 0 }
          : chat
      ));
    }
  }, [selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: input.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setIsTyping(false);

    // Simulate response
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        sender: selectedChat?.name || "Sarah Chen",
        text: "That sounds great! 👍",
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        isMe: false,
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectChat = (chat) => {
    setSelectedChat(chat);
    setMessages(initialMessages); // In real app, fetch messages for this chat
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-10">
      <FeatureNav />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Event Chat
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Connect and chat with people attending your events
        </p>
      </motion.div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 h-[700px] flex">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                onClick={() => selectChat(chat)}
                className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100 dark:border-gray-800 transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                  )}
                  {chat.isGroup && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <FiUsers size={10} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {chat.typing ? (
                        <span className="text-blue-500 italic">typing...</span>
                      ) : (
                        chat.lastMessage
                      )}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {selectedChat.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedChat.online ? 'Active now' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <FiPhone size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <FiVideo size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button 
                  onClick={() => setShowChatInfo(!showChatInfo)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <FiMoreVertical size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.isMe ? 'order-2' : 'order-1'}`}>
                    {!message.isMe && (
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src={selectedChat.avatar}
                          alt={selectedChat.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {message.sender}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {message.time}
                        </span>
                      </div>
                    )}
                    
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.isMe
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    
                    {message.isMe && (
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {message.time}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-end gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <FiPaperclip size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    style={{ minHeight: '40px', maxHeight: '120px' }}
                  />
                </div>
                
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <FiSmile size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
                
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMessageCircle size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choose a chat from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Chat Info Modal */}
      <AnimatePresence>
        {showChatInfo && selectedChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowChatInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Chat Info
                  </h3>
                  <button
                    onClick={() => setShowChatInfo(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedChat.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedChat.online ? 'Active now' : 'Offline'}
                  </p>
                </div>

                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <FiPhone size={18} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white">Voice Call</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <FiVideo size={18} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white">Video Call</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <FiSettings size={18} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white">Chat Settings</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
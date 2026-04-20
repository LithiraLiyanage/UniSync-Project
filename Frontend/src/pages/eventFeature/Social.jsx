import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiSearch, FiFilter, FiMessageCircle, FiUserPlus, FiX, FiStar, FiMapPin, FiBook, FiCalendar, FiHeart, FiShare2, FiSend, FiPhone, FiVideo, FiMoreVertical } from "react-icons/fi";
import FeatureNav from "./FeatureNav";

const sampleUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=150&q=80",
    role: "Computer Science",
    year: "3rd Year",
    interests: ["AI/ML", "Web Dev", "Photography"],
    bio: "Passionate about technology and creative problem-solving. Always up for hackathons and coffee!",
    eventsAttending: 12,
    rating: 4.8,
    location: "Computer Lab",
    isFollowing: false,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    role: "Business Administration",
    year: "4th Year",
    interests: ["Entrepreneurship", "Marketing", "Networking"],
    bio: "Future entrepreneur building connections and learning from every opportunity.",
    eventsAttending: 8,
    rating: 4.6,
    location: "Business School",
    isFollowing: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    role: "Graphic Design",
    year: "2nd Year",
    interests: ["UI/UX", "Digital Art", "Animation"],
    bio: "Creative soul with a love for beautiful design and user experiences.",
    eventsAttending: 15,
    rating: 4.9,
    location: "Art Building",
    isFollowing: false,
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    role: "Mechanical Engineering",
    year: "3rd Year",
    interests: ["Robotics", "3D Printing", "Innovation"],
    bio: "Engineering enthusiast working on cool projects and always learning new tech.",
    eventsAttending: 6,
    rating: 4.7,
    location: "Engineering Building",
    isFollowing: false,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=150&q=80",
    role: "Psychology",
    year: "2nd Year",
    interests: ["Research", "Mental Health", "Writing"],
    bio: "Understanding human behavior and helping others through research and support.",
    eventsAttending: 10,
    rating: 4.5,
    location: "Library",
    isFollowing: true,
  },
  {
    id: 6,
    name: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    role: "Data Science",
    year: "4th Year",
    interests: ["Data Analysis", "Machine Learning", "Statistics"],
    bio: "Data-driven decision maker passionate about uncovering insights from complex datasets.",
    eventsAttending: 9,
    rating: 4.8,
    location: "Data Science Lab",
    isFollowing: false,
  },
];

const interests = [
  "AI/ML", "Web Dev", "Photography", "Entrepreneurship", "Marketing", "Networking",
  "UI/UX", "Digital Art", "Animation", "Robotics", "3D Printing", "Innovation",
  "Research", "Mental Health", "Writing", "Data Analysis", "Statistics", "Music",
  "Sports", "Gaming", "Travel", "Cooking", "Reading", "Volunteering"
];

const Social = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showChatSidebar, setShowChatSidebar] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Sarah Chen", text: "Hey! Are you coming to the AI Workshop?", time: "2:25 PM", isMe: false },
    { id: 2, sender: "You", text: "Yes! I'm really excited about it.", time: "2:26 PM", isMe: true },
    { id: 3, sender: "Sarah Chen", text: "Perfect! See you there", time: "2:28 PM", isMe: false },
  ]);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesInterests = 
      selectedInterests.length === 0 ||
      selectedInterests.some(interest => user.interests.includes(interest));
    
    return matchesSearch && matchesInterests;
  });

  const toggleFollow = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: !user.isFollowing }
        : user
    ));
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleMessageSubmit = () => {
    if (message.trim() && selectedUser) {
      // Here you would typically send the message via API
      console.log(`Sending message to ${selectedUser.name}: ${message}`);
      setMessage("");
      setShowMessageModal(false);
      setSelectedUser(null);
    }
  };

  const getMatchPercentage = (user) => {
    if (selectedInterests.length === 0) return 0;
    const matchingInterests = user.interests.filter(interest => 
      selectedInterests.includes(interest)
    ).length;
    return Math.round((matchingInterests / selectedInterests.length) * 100);
  };

  const openChat = (user) => {
    setSelectedUser(user);
    setShowChatSidebar(true);
    setChatMessages([
      { id: 1, sender: user.name, text: "Hey! Nice to connect with you!", time: "2:25 PM", isMe: false },
    ]);
  };

  const sendChatMessage = () => {
    if (chatInput.trim() && selectedUser) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: "You",
        text: chatInput.trim(),
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        isMe: true,
      };
      
      setChatMessages([...chatMessages, newMessage]);
      setChatInput("");
      
      // Simulate response
      setTimeout(() => {
        const responseMessage = {
          id: chatMessages.length + 2,
          sender: selectedUser.name,
          text: "That sounds great! Looking forward to it!",
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
          isMe: false,
        };
        setChatMessages(prev => [...prev, responseMessage]);
      }, 1000);
    }
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
        <h1 className="text-5xl font-black bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent mb-4">
          Social Matching
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Connect with like-minded students and expand your network
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, role, or bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <FiFilter size={16} />
            Interests Filter
            {selectedInterests.length > 0 && (
              <span className="px-2 py-1 bg-pink-500 text-white text-xs rounded-full">
                {selectedInterests.length}
              </span>
            )}
          </button>
        </div>

        {/* Interest Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Select Interests to Find Matches
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedInterests.includes(interest)
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold">{filteredUsers.length}</p>
            </div>
            <FiUsers size={24} className="text-pink-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-violet-100 text-sm">Following</p>
              <p className="text-3xl font-bold">{users.filter(u => u.isFollowing).length}</p>
            </div>
            <FiHeart size={24} className="text-violet-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">Active Events</p>
              <p className="text-3xl font-bold">24</p>
            </div>
            <FiCalendar size={24} className="text-emerald-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">New Matches</p>
              <p className="text-3xl font-bold">8</p>
            </div>
            <FiStar size={24} className="text-blue-200" />
          </div>
        </motion.div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
              {/* Match Badge */}
              {selectedInterests.length > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {getMatchPercentage(user)}% Match
                  </span>
                </div>
              )}

              {/* User Avatar and Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-3 border-white dark:border-gray-900 shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{user.year}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.rating}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {user.bio}
                </p>

                {/* Location and Events */}
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <FiMapPin size={12} />
                    {user.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCalendar size={12} />
                    {user.eventsAttending} events
                  </div>
                </div>

                {/* Interests */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {user.interests.slice(0, 3).map((interest) => (
                      <span
                        key={interest}
                        className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs rounded-lg"
                      >
                        {interest}
                      </span>
                    ))}
                    {user.interests.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-lg">
                        +{user.interests.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className={`flex-1 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      user.isFollowing
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {user.isFollowing ? (
                      <>
                        <FiUserPlus size={16} />
                        Following
                      </>
                    ) : (
                      <>
                        <FiUserPlus size={16} />
                        Follow
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => openChat(user)}
                    className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <FiMessageCircle size={16} />
                  </button>
                  
                  <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <FiShare2 size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUsers size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No users found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters to find more people.
          </p>
        </div>
      )}

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowMessageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedUser.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedUser.role}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    placeholder={`Hi ${selectedUser.name}, I'd love to connect...`}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleMessageSubmit}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Send Message
                  </button>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {showChatSidebar && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
            onClick={() => setShowChatSidebar(false)}
          >
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-md h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selectedUser.name}
                    </h3>
                    <p className="text-xs text-green-500">Active now</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <FiPhone size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <FiVideo size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => setShowChatSidebar(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <FiX size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message, index) => (
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
                            src={selectedUser.avatar}
                            alt={selectedUser.name}
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
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendChatMessage())}
                      placeholder="Type a message..."
                      rows={1}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      style={{ minHeight: '40px', maxHeight: '120px' }}
                    />
                  </div>
                  
                  <button
                    onClick={sendChatMessage}
                    className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <FiSend size={16} />
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

export default Social;
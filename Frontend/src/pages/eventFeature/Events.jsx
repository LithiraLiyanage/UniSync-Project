import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiMapPin, FiUsers, FiFilter, FiHeart, FiShare2, FiClock } from 'react-icons/fi';
import { useEvents } from '../../context/EventsContext';
import FeatureNav from './FeatureNav';

const Events = () => {
  const { events } = useEvents();
  const [localEvents, setLocalEvents] = useState(events);

  // Listen for custom events from other tabs/components
  useEffect(() => {
    const handleEventsUpdate = (e) => {
      console.log('Events page received update:', e.detail);
      setLocalEvents(e.detail);
    };

    window.addEventListener('eventsUpdated', handleEventsUpdate);
    return () => window.removeEventListener('eventsUpdated', handleEventsUpdate);
  }, []);

  // Update local events when context events change
  useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedEvents, setSavedEvents] = useState([]);
  const categories = [
    { value: "all", label: "All Events", color: "bg-gradient-to-r from-purple-500 to-indigo-600" },
    { value: "Technology", label: "Technology", color: "bg-gradient-to-r from-blue-500 to-cyan-600" },
    { value: "Business", label: "Business", color: "bg-gradient-to-r from-emerald-500 to-green-600" },
    { value: "Arts", label: "Arts", color: "bg-gradient-to-r from-pink-500 to-rose-600" },
    { value: "Entertainment", label: "Entertainment", color: "bg-gradient-to-r from-orange-500 to-red-600" },
    { value: "Health", label: "Health", color: "bg-gradient-to-r from-teal-500 to-cyan-600" },
  ];

  const filteredEvents = localEvents.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredEvents = filteredEvents.filter(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);

  const toggleSaveEvent = (eventId) => {
    setSavedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : "bg-gradient-to-r from-gray-500 to-gray-600";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-10">
      <FeatureNav />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-5xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Campus Events
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Discover amazing events and connect with your campus community
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events, tags, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === category.value
                    ? `${category.color} text-white shadow-lg scale-105`
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full mr-3"></span>
            Featured Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      FEATURED
                    </span>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={() => toggleSaveEvent(event.id)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <FiHeart 
                      className={`w-4 h-4 ${savedEvents.includes(event.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} 
                    />
                  </button>

                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiCalendar className="mr-2" size={14} />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiMapPin className="mr-2" size={14} />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiUsers className="mr-2" size={14} />
                        {event.attendees}/{event.maxAttendees} attending
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2 rounded-xl hover:shadow-lg transition-all duration-300 font-medium">
                        Register Now
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
        </div>
      )}

      {/* Regular Events */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-3"></span>
          All Events
        </h2>
        
        {regularEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
                  {/* Save Button */}
                  <button
                    onClick={() => toggleSaveEvent(event.id)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <FiHeart 
                      className={`w-4 h-4 ${savedEvents.includes(event.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} 
                    />
                  </button>

                  {/* Event Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <FiCalendar className="mr-2" size={12} />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <FiMapPin className="mr-2" size={12} />
                        {event.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <FiUsers className="mr-2" size={12} />
                        {event.attendees}/{event.maxAttendees} attending
                      </div>
                    </div>

                    <button className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
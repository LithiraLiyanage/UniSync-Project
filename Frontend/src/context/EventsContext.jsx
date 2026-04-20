import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial sample events data
const initialEvents = [
  {
    id: 1,
    title: "AI Workshop",
    date: "2026-05-10",
    time: "2:00 PM",
    location: "Computer Lab A",
    category: "Technology",
    description: "Learn AI basics and practical applications with hands-on experience.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    attendees: 45,
    maxAttendees: 60,
    organizer: "CS Department",
    tags: ["AI", "Machine Learning", "Workshop"],
    featured: true,
  },
  {
    id: 2,
    title: "Music Night",
    date: "2026-05-12",
    time: "6:00 PM",
    location: "Main Auditorium",
    category: "Entertainment",
    description: "Enjoy live performances and meet new friends in a vibrant atmosphere.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    attendees: 120,
    maxAttendees: 200,
    organizer: "Student Council",
    tags: ["Music", "Live Performance", "Social"],
    featured: false,
  },
  {
    id: 3,
    title: "Startup Meetup",
    date: "2026-05-15",
    time: "4:00 PM",
    location: "Innovation Hub",
    category: "Business",
    description: "A networking event for aspiring entrepreneurs and startup enthusiasts.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
    attendees: 85,
    maxAttendees: 100,
    organizer: "Entrepreneurship Club",
    tags: ["Startup", "Networking", "Business"],
    featured: true,
  },
  {
    id: 4,
    title: "Photography Exhibition",
    date: "2026-05-18",
    time: "10:00 AM",
    location: "Art Gallery",
    category: "Arts",
    description: "Explore stunning photography works from talented student artists.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    attendees: 30,
    maxAttendees: 50,
    organizer: "Photography Club",
    tags: ["Photography", "Art", "Exhibition"],
    featured: false,
  },
  {
    id: 5,
    title: "Hackathon 2026",
    date: "2026-05-20",
    time: "9:00 AM",
    location: "Tech Building",
    category: "Technology",
    description: "48-hour coding marathon with amazing prizes and networking opportunities.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    attendees: 150,
    maxAttendees: 200,
    organizer: "Tech Club",
    tags: ["Hackathon", "Coding", "Competition"],
    featured: true,
  },
  {
    id: 6,
    title: "Yoga & Wellness",
    date: "2026-05-22",
    time: "7:00 AM",
    location: "Sports Complex",
    category: "Health",
    description: "Start your day with refreshing yoga sessions and wellness activities.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80",
    attendees: 25,
    maxAttendees: 40,
    organizer: "Wellness Center",
    tags: ["Yoga", "Wellness", "Health"],
    featured: false,
  },
];

const EventsContext = createContext();

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    // Try to load from localStorage on initial render
    try {
      const savedEvents = localStorage.getItem('events');
      if (savedEvents) {
        const parsed = JSON.parse(savedEvents);
        console.log('Initial load from localStorage:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    console.log('Using initial events:', initialEvents);
    return initialEvents;
  });

  // Save to localStorage whenever events change
  useEffect(() => {
    try {
      console.log('Saving to localStorage:', events);
      localStorage.setItem('events', JSON.stringify(events));
      
      // Trigger custom event for cross-component communication
      window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: events }));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [events]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'events') {
        try {
          const newEvents = JSON.parse(e.newValue);
          console.log('Storage change detected:', newEvents);
          setEvents(newEvents);
        } catch (error) {
          console.error('Error parsing storage change:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now(),
      attendees: 0,
      image: newEvent.image || `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?auto=format&fit=crop&w=900&q=80`,
    };
    
    console.log('Adding event:', eventWithId);
    setEvents(prevEvents => {
      const updated = [...prevEvents, eventWithId];
      console.log('Events after add:', updated);
      return updated;
    });
    return eventWithId;
  };

  const updateEvent = (id, updatedEvent) => {
    console.log('Updating event:', id, updatedEvent);
    setEvents(prevEvents => {
      const updated = prevEvents.map(event => 
        event.id === id ? { ...event, ...updatedEvent } : event
      );
      console.log('Events after update:', updated);
      return updated;
    });
  };

  const deleteEvent = (id) => {
    console.log('Deleting event:', id);
    setEvents(prevEvents => {
      const updated = prevEvents.filter(event => event.id !== id);
      console.log('Events after delete:', updated);
      return updated;
    });
  };

  const getEventById = (id) => {
    return events.find(event => event.id === id);
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;

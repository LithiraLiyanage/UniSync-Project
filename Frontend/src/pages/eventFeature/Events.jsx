import React, { useState } from "react";
import FeatureNav from "./FeatureNav";

const sampleEvents = [
  {
    id: 1,
    title: "AI Workshop",
    date: "2026-05-10",
    location: "Lab 1",
    category: "Tech",
    description: "Learn AI basics and practical applications.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Music Night",
    date: "2026-05-12",
    location: "Main Ground",
    category: "Social",
    description: "Enjoy live performances and meet new friends.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Startup Meetup",
    date: "2026-05-15",
    location: "Auditorium",
    category: "Business",
    description: "A networking event for aspiring entrepreneurs.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
  },
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = sampleEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Campus Events</h1>
          <p className="mt-2 text-slate-500">
            Discover and explore events related to your university life.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-slate-300 px-4 py-2 rounded-xl w-full md:w-64 outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-44 object-cover"
            />

            <div className="p-5">
              <span className="inline-block mb-3 px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full">
                {event.category}
              </span>

              <h2 className="text-xl font-bold mb-2 text-slate-900">
                {event.title}
              </h2>

              <p className="text-sm text-slate-500 mb-1">📅 {event.date}</p>
              <p className="text-sm text-slate-500 mb-3">📍 {event.location}</p>

              <p className="text-sm text-slate-600 mb-4">
                {event.description}
              </p>

              <button className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <p className="col-span-full text-center text-slate-400">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Events;
import React, { useState } from 'react';
import { useEvents } from '../context/EventsContext';

const AdminSocialEventsSimple = () => {
  try {
    const { events } = useEvents();
    
    return (
      <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Admin Events Management
        </h1>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Total Events: {events.length}
          </p>
          <div className="space-y-2">
            {events.map(event => (
              <div key={event.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{event.date} - {event.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in AdminSocialEventsSimple:', error);
    return (
      <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-10">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded">
          <p>Error loading events: {error.message}</p>
        </div>
      </div>
    );
  }
};

export default AdminSocialEventsSimple;

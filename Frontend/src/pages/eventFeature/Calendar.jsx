import React from "react";
import FeatureNav from "./FeatureNav";
const calendarEvents = [
  { id: 1, title: "AI Workshop", date: "2026-05-10", time: "10:00 AM", location: "Lab 1" },
  { id: 2, title: "Music Night", date: "2026-05-12", time: "6:00 PM", location: "Main Ground" },
  { id: 3, title: "Startup Meetup", date: "2026-05-15", time: "2:00 PM", location: "Auditorium" },
  { id: 4, title: "Coding Competition", date: "2026-05-18", time: "9:00 AM", location: "Computer Lab" },
];

const Calendar = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Event Calendar</h1>
        <p className="text-slate-500 mt-2">
          View your upcoming university events and schedules
        </p>
      </div>

      <div className="space-y-4">
        {calendarEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{event.title}</h2>
                <p className="text-slate-500 text-sm mt-1">
                  📅 {event.date} &nbsp; | &nbsp; 🕒 {event.time}
                </p>
                <p className="text-slate-500 text-sm mt-1">📍 {event.location}</p>
              </div>

              <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition w-fit">
                Add Reminder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
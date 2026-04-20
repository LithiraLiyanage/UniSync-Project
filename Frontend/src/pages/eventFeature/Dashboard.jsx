import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Event Management Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          onClick={() => navigate("/event-feature/events")}
          className="bg-indigo-600 text-white p-4 rounded-xl"
        >
          Go to Events
        </button>

        <button
          onClick={() => navigate("/event-feature/social")}
          className="bg-pink-600 text-white p-4 rounded-xl"
        >
          Go to Social Matching
        </button>

        <button
          onClick={() => navigate("/event-feature/calendar")}
          className="bg-emerald-600 text-white p-4 rounded-xl"
        >
          Go to Calendar
        </button>

        <button
          onClick={() => navigate("/event-feature/chat")}
          className="bg-slate-700 text-white p-4 rounded-xl"
        >
          Go to Chat
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from "react";
import FeatureNav from "./FeatureNav";

const users = [
  { id: 1, name: "Nimal", interests: ["AI", "Coding"] },
  { id: 2, name: "Kasun", interests: ["Music", "Sports"] },
  { id: 3, name: "Saman", interests: ["AI", "Business"] },
  { id: 4, name: "Ravi", interests: ["Coding", "Gaming"] },
];

const Social = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.interests.some((i) =>
        i.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Social Matching
        </h1>
        <p className="text-slate-500 mt-2">
          Find people with similar interests
        </p>
      </div>

      <input
        type="text"
        placeholder="Search by name or interest..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-slate-300 px-4 py-2 rounded-xl w-full mb-6 outline-none focus:ring-2 focus:ring-pink-400"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold mb-2 text-slate-900">
              {user.name}
            </h2>

            <div className="flex gap-2 flex-wrap">
              {user.interests.map((i, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs bg-pink-100 text-pink-600 rounded-full"
                >
                  {i}
                </span>
              ))}
            </div>

            <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-xl hover:bg-pink-700 transition">
              Connect
            </button>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="col-span-full text-center text-slate-400">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Social;
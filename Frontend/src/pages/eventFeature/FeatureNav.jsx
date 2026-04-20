import { useNavigate, useLocation } from "react-router-dom";

const links = [
  { path: "/event-dashboard", label: "Dashboard" },
  { path: "/event-feature/events", label: "Events" },
  { path: "/event-feature/social", label: "Social" },
  { path: "/event-feature/calendar", label: "Calendar" },
  { path: "/event-feature/chat", label: "Chat" },
];

export default function FeatureNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {links.map((l) => (
        <button
          key={l.path}
          onClick={() => navigate(l.path)}
          className={`px-4 py-2 rounded-xl text-sm ${
            pathname === l.path
              ? "bg-indigo-600 text-white"
              : "bg-white border text-slate-700 hover:bg-slate-100"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
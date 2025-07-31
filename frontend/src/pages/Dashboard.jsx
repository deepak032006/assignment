import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/sessions')
      .then(res => {
        setSessions(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filteredList = sessions.filter(s =>
      s.title.toLowerCase().includes(term) ||
      s.tags.some(tag => tag.toLowerCase().includes(term))
    );
    setFiltered(filteredList);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header with title, Add Session & Logout */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🧘‍♂️ Public Wellness Sessions</h2>
        <div className="flex gap-3">
          <Link
            to="/editor"
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            ➕ Add Session
          </Link>
          <Link
            to="/logout"
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
          >
            🔓 Logout
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="🔍 Search sessions by title or tags..."
        className="mb-8 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
        onChange={handleSearch}
      />

      {/* Session cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="mb-4">No public sessions available yet.</p>
          <Link
            to="/editor"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            ➕ Create Your First Session
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <div
              key={s._id}
              className="bg-white shadow-lg rounded-2xl p-5 border hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{s.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Tags:</span>{' '}
                <span className="text-blue-600">{s.tags.join(', ')}</span>
              </p>
              <a
                href={s.json_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-500 hover:underline"
              >
                📄 View JSON File
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

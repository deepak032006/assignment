import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function MySessions() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/my-sessions').then(res => setSessions(res.data));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">📚 My Sessions</h2>
        <button
          onClick={() => navigate('/editor')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + New Session
        </button>
      </div>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No sessions created yet.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map(s => (
            <li
              key={s._id}
              className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row md:items-center justify-between border"
            >
              <div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="text-gray-600">
                  Tags: <span className="text-blue-600">{s.tags.join(', ')}</span>
                </p>
                <p className="text-sm mt-1">
                  Status: <span className={s.is_published ? 'text-green-600' : 'text-yellow-600'}>
                    {s.is_published ? 'Published' : 'Draft'}
                  </span>
                </p>
              </div>
              <button
                onClick={() => navigate(`/editor/${s._id}`)}
                className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm"
              >
                ✏️ Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

export default function SessionEditor() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [json_url, setJsonUrl] = useState('');
  const timeout = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/my-sessions/${id}`).then(res => {
        setTitle(res.data.title);
        setTags(res.data.tags.join(', '));
        setJsonUrl(res.data.json_url);
      });
    }
  }, [id]);

  useEffect(() => {
    if (title || tags || json_url) {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => handleSave(), 5000);
    }
    return () => clearTimeout(timeout.current);
  }, [title, tags, json_url]);

  const handleSave = async () => {
    const res = await api.post('/my-sessions/save-draft', {
      id,
      title,
      tags: tags.split(',').map(t => t.trim()),
      json_url
    });
    if (!id) navigate(`/editor/${res.data._id}`);
  };

  const handlePublish = async () => {
    await handleSave();
    await api.post('/my-sessions/publish', { id });
    navigate('/my-sessions');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">📝 Session Editor</h2>

      <div className="space-y-4">
        <input
          placeholder="Session Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-3 border rounded"
        />
        <input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full p-3 border rounded"
        />
        <input
          placeholder="JSON File URL"
          value={json_url}
          onChange={e => setJsonUrl(e.target.value)}
          className="w-full p-3 border rounded"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSave}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            💾 Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            🚀 Publish
          </button>
        </div>
      </div>
    </div>
  );
}

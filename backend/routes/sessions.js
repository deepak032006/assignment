const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const { verifyToken } = require('../middleware/auth'); 


router.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find({ is_published: true });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/my-sessions', verifyToken, async (req, res) => {
  const sessions = await Session.find({ user_id: req.user.id });
  res.json(sessions);
});


router.get('/my-sessions/:id', verifyToken, async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!session) return res.status(404).json({ msg: 'Not found' });
  res.json(session);
});


router.post('/my-sessions/save-draft', verifyToken, async (req, res) => {
  const { id, title, tags, json_url } = req.body;
  let session;

  if (id) {
    session = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      { title, tags, json_url, is_published: false, updated_at: new Date() },
      { new: true }
    );
  } else {
    session = new Session({
      user_id: req.user.id,
      title,
      tags,
      json_url,
      is_published: false
    });
    await session.save();
  }

  res.json(session);
});


router.post('/my-sessions/publish', verifyToken, async (req, res) => {
  const { id } = req.body;
  const session = await Session.findOneAndUpdate(
    { _id: id, user_id: req.user.id },
    { is_published: true, updated_at: new Date() },
    { new: true }
  );
  if (!session) return res.status(404).json({ msg: 'Not found' });
  res.json(session);
});

module.exports = router;

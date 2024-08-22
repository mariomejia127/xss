import db from '../../db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const stmt = db.prepare('SELECT * FROM messages');
    const messages = stmt.all();
    res.status(200).json(messages);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
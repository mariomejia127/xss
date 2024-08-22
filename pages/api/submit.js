import db from '../../db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, message } = req.body;
    const stmt = db.prepare('INSERT INTO messages (name, message) VALUES (?, ?)');
    const info = stmt.run(name, message);
    res.status(200).json({ message: 'Submission received', id: info.lastInsertRowid });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
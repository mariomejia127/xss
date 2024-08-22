const Database = require('better-sqlite3');
const db = new Database('messages.db', { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT
  )
`);

module.exports = db;
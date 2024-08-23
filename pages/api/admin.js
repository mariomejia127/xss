import db from '../../db';

function basicAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return false;
  }

  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  return user === process.env.ADMIN_USERNAME && pass === process.env.ADMIN_PASSWORD;
}

function simpleObfuscate(str) {
  return str.split('').map(char => char.charCodeAt(0).toString(16)).join('');
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    if (!basicAuth(req)) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Admin Panel"');
      res.status(401).end('Unauthorized');
      return;
    }

    const stmt = db.prepare('SELECT * FROM messages');
    const messages = stmt.all();

    const flag = '{FLAG-DLOCALSECURITYTEAM-001090011100098001080010500103}';
    const obfuscatedFlag = simpleObfuscate(flag);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Admin Panel</title>
          <script>
            (function() {
              const obfuscatedFlag = "${obfuscatedFlag}";
              function deobfuscate(str) {
                return str.match(/.{1,2}/g).map(char => String.fromCharCode(parseInt(char, 16))).join('');
              }
              const flag = deobfuscate(obfuscatedFlag);
              localStorage.setItem('secretFlag', flag);
            })();
          </script>
        </head>
        <body>
          <h1>Admin Panel</h1>
          <ul>
            ${messages.map(msg => `
              <li>
                <strong>${msg.name}</strong>: ${msg.message}
              </li>
            `).join('')}
          </ul>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
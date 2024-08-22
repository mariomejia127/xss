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

export default function handler(req, res) {
  if (req.method === 'GET') {
    if (!basicAuth(req)) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Admin Panel"');
      res.status(401).end('Unauthorized');
      return;
    }

    const stmt = db.prepare('SELECT * FROM messages');
    const messages = stmt.all();

    const obfuscatedFlag = Buffer.from('{FLAG-DLOCALSECURITYTEAM-001090011100098001080010500103}').toString('base64');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Admin Panel</title>
          <script>
            (function() {
              var _0x5a2d=['dzNDbyArn07M==n0nd7K7Q==','atob','getItem','setItem'];
              (function(_0x35de1f,_0x5a2d8d){var _0x41f81f=function(_0x44b613){while(--_0x44b613){_0x35de1f['push'](_0x35de1f['shift']());}};_0x41f81f(++_0x5a2d8d);}(_0x5a2d,0x170));
              var _0x41f8=function(_0x35de1f,_0x5a2d8d){_0x35de1f=_0x35de1f-0x0;var _0x41f81f=_0x5a2d[_0x35de1f];return _0x41f81f;};
              var flag=window[_0x41f8('0x0')](_0x41f8('0x1'));
              if(!localStorage[_0x41f8('0x2')]('secretFlag')){localStorage[_0x41f8('0x3')]('secretFlag',flag);}
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
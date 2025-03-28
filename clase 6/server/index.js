import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port = process.env.PORT ?? 1234;

const app = express();
const server = createServer(app);
const io = new Server(server);

dotenv.config();

// Creo la conexión a la db
const db = createClient({
  url: 'libsql://touched-firefly-guidoher18.aws-us-west-2.turso.io',
  authToken: process.env.DB_TOKEN
});

await db.execute(`CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    userName TEXT)`);

io.on('connection', async (socket) => {
  console.log('a user has connected!');

  socket.on('disconnect', () => {
    console.log('a user has disconnected!');
  });

  socket.on('chat message', async ({ msg, serverOffset, userName }) => {
    let result;
    try {
      const userName = socket.handshake.auth.userName ?? 'anonymous';

      result = await db.execute({
        sql: 'INSERT INTO messages (content, userName) VALUES (?, ?)',
        args: [msg, userName]
      });
    } catch (e) {
      console.log('error :>> ', e);
      return;
    }

    io.emit('chat message', { msg, serverOffset: result.lastInsertRowid.toString(), userName });
  });

  // console.log(socket.handshake.auth);

  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: 'SELECT * FROM messages WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0]
      });

      results.rows.forEach(row => {
        socket.emit('chat message', {
          msg: row.content,
          serverOffset: row.id.toString(),
          userName: row.userName
        }
        );
      });
    } catch (e) {
      console.log(e);
    }
  }
});

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});

const express = require('express');
const WebSocketServer = require('ws').Server;
const parseCookie = express.cookieParser('some secret');
const MemoryStore = express.session.MemoryStore;
const store = new MemoryStore();

const app = express();
const server = app.listen(process.env.PORT || 3000);
let webSocketServer;

app.use(parseCookie);
app.use(express.session({store: store, secret: 'some secret'}));
app.use(express.static(__dirname + '/static'));

app.get('/random', (req, res) => {
  req.session.random = Math.random().toString();
  res.send(200);
})

webSocketServer = new WebSocketServer({server: server});

webSocketServer.on('connection', (ws) => {
  let session;
  ws.on('message', (data, flags) => {
    let message = JSON.parse(data);
    if (message.type === 'getSession') {
      parseCookie(ws.upgradeReq, null, (err) => {
        let sid = ws.upgradeReq.signedCookies['connect.sid'];
        store.get(sid, (err, loadedSession) => {
          if (err) console.error(err);
          session = loadedSession;
          ws.send('session.random'+ session.random, {
            mask: false
          });
        });
      });
    } else {
      ws.send('Wnkown command');
    }
  })
})

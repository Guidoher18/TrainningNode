// Vamos a crear una API desde Cero

const http = require('node:http');
const dittoJSON = require('./pokemon/ditto.js');

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json;charset=utf-8');
          res.end(JSON.stringify(dittoJSON));
          break;
        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html;charset=utf-8');
          res.end('<h1>Error!</h1>');
          break;
      }
      break;
    case 'POST':
      switch (url) {
        // escuchar el evento data
        case '/pokemon':
          {
            let body = '';

            req.on('data', (chunk) => {
              console.log(chunk);
              body += chunk.toString();
            });

            req.on('end', () => {
              const data = JSON.parse(body);
              res.writeHead(201, {
                'Content-Type': 'application/json;charset=utf-8'
              });
              data.timestamp = Date.now();
              console.log(data);
            });
            //   res.setHeader('Content-Type', 'application/json;charset=utf-8');
            //   res.end(JSON.stringify(dittoJSON));
          }
          break;
        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html;charset=utf-8');
          res.end('<h1>Error!</h1>');
          break;
      }
      break;
    default:
      break;
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log('##2Server listening on port http://localhost:1234');
});

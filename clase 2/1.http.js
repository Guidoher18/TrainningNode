const fs = require('node:fs');
const http = require('node:http');

const desirePort = process.env.PORT ?? 1234;

const generateRes = (req, res) => {
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  //   console.log(req.url);
  switch (req.url) {
    case '/':
      res.end('<h1>Bienvenido a la página de inicio</h1>');
      break;
    case '/imagen-super-bonita.png':
      fs.readFile('C:\\Users\\accio\\Downloads\\Designer.png', (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('<h1>Error interno del servidor</h1>');
        } else {
          res.setHeader('Content-Type', 'image/png');
          res.end(data);
        }
      });
      break;
    case '/contacto':
      res.end('<h1>Página de Contacto</h1>');
      break;
    default:
      res.statusCode = 404; // Not Found
      res.end('<h1>404 > Not Found</h1>');
      break;
  }
};

const processRequest = (req, res) => {
  console.log('request received');
  //   res.end('Hello World');
  generateRes(req, res);
};

const server = http.createServer(processRequest);

server.listen(desirePort, () => {
  console.log(`Server listening on port http://localhost:${desirePort}`);
});

// Importo el framework
const express = require('express');
const dittoJSON = require('./pokemon/ditto.js');

const PORT = process.env.PORT ?? 1234;

// Creo la aplicación
const app = express();

app.disable('x-powered-by');

// Middleware
app.use((req, res, next) => {
  if (req.method !== 'POST') return next();
  if (req.headers['content-type'] !== 'application/json') return next();

  // Llegan sólo los request POST + application/json

  let body = '';

  req.on('data', (chunk) => {
    // console.log(chunk);
    body += chunk.toString();
  });

  req.on('end', () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();

    // Mutar la request
    req.body = data;
  });

  next();
});

// Defino los endpoints
app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a la página de inicio</h1>');
});

app.get('/pokemon/ditto', (req, res) => {
  res.send(dittoJSON);
});

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body);
  // let body = '';

  // req.on('data', (chunk) => {
  //   // console.log(chunk);
  //   body += chunk.toString();
  // });

  // req.on('end', () => {
  //   const data = JSON.parse(body);
  //   data.timestamp = Date.now();
  //   // console.log(data);
  //   res.status(201).json(data);
  // });
});

app.use((req, res) => {
  res.status(404).send('<h1>404 > Not Found</h1>');
});

// Escucho el servidor
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

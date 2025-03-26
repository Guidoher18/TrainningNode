import express, { json } from 'express';
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './Middleware/cors.js';

const app = express();

app.use(json());

// app.use(corsMiddleware());

app.disable('x-powered-by'); // deshabilito el x-power-by: express

app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

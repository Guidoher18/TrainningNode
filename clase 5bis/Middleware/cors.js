import cors from 'cors';

const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:1234'];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) { return callback(null, true); }
    }
  });

// TODO: FIX CORS BUG, impide el avance de la request

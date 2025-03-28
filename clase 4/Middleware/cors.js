import cors from 'cors';

const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:1234'];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      console.log(acceptedOrigins);
      console.log(origin);
      if (acceptedOrigins.includes(origin) || !origin)
        return callback(null, true);
      
      return callback(new Error('Not allowed by CORS'));
    }
  });

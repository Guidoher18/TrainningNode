import { createApp } from './app.js';
import { MovieModel } from './my-sql/movie.js';

createApp({ movieModel: MovieModel });

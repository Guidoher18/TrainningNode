import { readJSON } from '../utils.js';
import { randomUUID } from 'node:crypto';

// Leo el movies.json
const movies = readJSON('./movies.json');

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) return movies.filter((m) => m.genre.includes(genre));
    return movies;
  }

  static async getById ({ id }) {
    if (id) return movies.find((movie) => movie.id === id);
  }

  static async create (input) {
    const newMovie = {
      id: randomUUID(),
      ...input
    };

    // por esto ya no sería REST
    movies.push(newMovie);
    return newMovie;
  }

  static getMovieIndex = (id) => movies.findIndex((x) => x.id === id);

  async update (index, data) {
    const movie = movies[index];

    const updateMovie = {
      ...movie,
      ...data
    };

    movies[index] = updateMovie;

    return updateMovie;
  }

  async delete ({ id }) {
    const index = MovieModel.getMovieIndex(id);

    if (index < 0) return false;

    movies.splice(index, 1);
    return true;
  }
}

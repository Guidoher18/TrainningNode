import { MovieModel } from '../models/movie.js';
// import { MovieModel } from '../../clase 5/my-sql/movie.js';
import { validateMovie, validatePartialMovie } from '../schema/movie.js';

export class MoviesController {
  static async getAll(req, res) {
    const items = await MovieModel.getAll(req.query);
    res.json(items);
  }

  static async getById(req, res) {
    const movie = await MovieModel.getById(req.params);
    if (!movie) res.status(404).json({ error: 'Movie not found' });
    else res.json(movie);
  }

  static async create(req, res) {
    const result = validateMovie(req.body);

    if (result.error) {
      return res.status(400).json(JSON.parse(result.error.message));
    }

    const newMovie = await MovieModel.Create(result.data);
    res.status(201).json(newMovie);
  }

  static async update(req, res) {
    const { id } = req.params;

    const movieIndex = MovieModel.getMovieIndex(id);

    if (movieIndex < 0)
      return res.status(404).json({ message: '404 - Movie not found!' });

    const result = validatePartialMovie(req.body);

    if (result.error)
      return res.status(400).json(JSON.parse(result.error.message));

    const updateMovie = await MovieModel.update(movieIndex, result.data);

    return res.json(updateMovie);
  }

  static async delete(req, res) {
    const result = await MovieModel.delete(req.params);

    if (!result)
      return res.status(404).json({ message: '404 - Movie not found!' });

    return res.json({ message: 'Movie deleted' });
  }
}

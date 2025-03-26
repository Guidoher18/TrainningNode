// import { MovieModel } from '../models/movie.js';
// import { MovieModel } from '../../clase 5/my-sql/movie.js';
import { validateMovie, validatePartialMovie } from '../schema/movie.js';

export class MoviesController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel;
  }

  getAll = async (req, res) => {
    const items = await this.movieModel.getAll(req.query);
    res.json(items);
  };

  getById = async (req, res) => {
    const movie = await this.movieModel.getById(req.params);
    if (!movie) res.status(404).json({ error: 'Movie not found' });
    else res.json(movie);
  };

  create = async (req, res) => {
    const result = validateMovie(req.body);
    // console.log(JSON.stringify(result)); TODO:BORRAR
    // console.log(result.data); TODO:BORRAR
    if (result.error) {
      return res.status(400).json(JSON.parse(result.error.message));
    }
    const newMovie = await this.movieModel.create(result.data);
    res.status(201).json(newMovie);
  };

  update = async (req, res) => {
    const { id } = req.params;

    const movie = await this.movieModel.getById({ id });

    if (!movie) { return res.status(404).json({ message: '404 - Movie not found!' }); }

    const result = validatePartialMovie(req.body);

    if (result.error) { return res.status(400).json(JSON.parse(result.error.message)); }

    const updateMovie = await this.movieModel.update({
      ...movie,
      ...result.data
    });

    return res.json(updateMovie);
  };

  delete = async (req, res) => {
    const result = this.movieModel.delete(req.params);

    if (!result) { return res.status(404).json({ message: '404 - Movie not found!' }); }

    return res.json({ message: 'Movie deleted' });
  };
}

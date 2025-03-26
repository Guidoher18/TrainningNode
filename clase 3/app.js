const express = require('express'); // common JS
const crypto = require('node:crypto'); // common JS
const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./schema/movie');

const app = express();

app.disable('x-powered-by'); // deshabilito el x-power-by: express

app.use(express.json());

// getAll
app.get('/movies/all', (req, res) => {
  res.json(movies);
});

// getByGenero
app.get('/movies', (req, res) => {
  const { genero } = req.query;

  const items = movies.filter((m) => m.genre.includes(genero));

  res.json(items);
});

// getById
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) res.status(404).json({ error: 'Movie not found' });
  else res.json(movie);
});

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    return res.status(400).json(JSON.parse(result.error.message));
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  };

  // por esto ya no sería REST
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

const getMovieIndex = (id) => movies.findIndex((x) => x.id == id);

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params;

  const movieIndex = getMovieIndex(id);

  if (movieIndex < 0)
    return res.status(404).json({ message: '404 - Movie not found!' });

  const result = validatePartialMovie(req.body);

  if (result.error)
    return res.status(400).json(JSON.parse(result.error.message));

  const movie = movies[movieIndex];

  const updateMovie = {
    ...movie,
    ...result.data
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = getMovieIndex(id);

  if (movieIndex < 0)
    return res.status(404).json({ message: '404 - Movie not found!' });

  movies.splice(movieIndex, 1);

  return res.json({ message: 'Movie deleted' });
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

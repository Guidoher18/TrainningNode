import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
};

const connection = await mysql.createConnection(config);

const shortUrl = (url) => {
  const length = url.length;

  if (length < 20) { return url; }

  const start = url.substring(0, 9);
  const end = url.substring(length - 11);

  return `${start}...${end}`;
};

const mapMovie = (m) => m.map(x => (
  {
    ...x,
    poster: shortUrl(x.poster)
  }
));

const setGenre = async (movie, genre) => {
  if (genre.length === 0) { return movie; }

  const query = `INSERT INTO moviesdb.movie_genre (movie_id, genre_id) VALUES (UUID_TO_BIN(?),
    (SELECT id
    FROM moviesdb.genre
    WHERE LOWER(name) = LOWER(?)
    LIMIT 1)
    );`;

  genre.forEach(async genre => {
    await connection.query(query, [movie.id, genre]);
  });

  return {
    ...movie,
    genre
  };
};

export class MovieModel {
  static async getAll ({ genre }) {
    const query = 'SELECT *, BIN_TO_UUID(id) AS id FROM movie';

    const queryWithGenre = `
     SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate
     FROM moviesdb.movie m 
     INNER JOIN moviesdb.movie_genre g 
     ON m.id = g.movie_id
     WHERE g.genre_id = (
        SELECT id
        FROM moviesdb.genre
        WHERE LOWER(name) = ?
        LIMIT 1
     );`;

    const result = await connection.query(genre ? queryWithGenre : query, [genre]);

    // [0]: QueryResult, [1]: FieldsResult
    return mapMovie(result[0]);
  }

  static async getById ({ id }) {
    const query = `SELECT *, BIN_TO_UUID(id) AS id 
      FROM moviesdb.movie
      WHERE id = UUID_TO_BIN(?)`;

    const result = await connection.query(query, [id]);

    if (result[0].length === 0) { return null; }

    return mapMovie(result[0])[0];
  }

  static async create (input) {
    const {
      title,
      year,
      director,
      duration,
      rate,
      poster,
      genre
    } = input;
    try {
      const [uuidResult] = await connection.query('SELECT UUID() uuid;');
      const [{ uuid }] = uuidResult;

      await connection.query(
        'INSERT INTO moviesdb.movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);',
        [uuid, title, year, director, duration, poster, rate]
      );

      const result = await MovieModel.getById({ id: uuid });

      return setGenre(
        mapMovie([result])[0],
        genre);
    } catch (error) {
      throw new Error('Error creating movie');
    }
  }

  static async delete ({ id }) {
    try {
      await connection.query('DELETE FROM moviesdb.movie WHERE id = UUID_TO_BIN(?)', [id]);
      await connection.query('DELETE FROM moviesdb.movie_genre WHERE movie_id = UUID_TO_BIN(?)', [id]);
    } catch (error) {
      throw new Error('Error deleting movie');
    }
  }

  static async update (input) {
    const {
      id,
      title,
      year,
      director,
      duration,
      rate,
      poster
    } = input;
    try {
      await connection.query(
        'UPDATE moviesdb.movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE id = UUID_TO_BIN(?);',
        [title, year, director, duration, poster, rate, id]
      );

      const result = await MovieModel.getById({ id });

      return mapMovie([result])[0];
    } catch (error) {
      console.error(error);
      throw new Error('Error updating movie');
    }
  }

  // TODO: Agregar al getById, getAll, update -> genre
}

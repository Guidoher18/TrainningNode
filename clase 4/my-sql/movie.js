import { mysql } from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'movies-database'
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll({ genre }) {
    const result = await connection.query(
      'SELECT *, BIN_TO_UUID(id) AS id FROM movie'
    );
    console.log(result);
  }

  static async getById({ id }) {}

  static async create({ input }) {}

  static async delete({ id }) {}

  static async update({ id, input }) {}
}

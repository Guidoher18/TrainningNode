import dblocal from 'db-local';
import { userSchemaValidation } from '../schema/userSchema.js';
import crypto from 'node:crypto';
import bcript from 'bcrypt';
import dotenv from 'dotenv/config';

const { Schema } = new dblocal({ path: './db' });

const userSchemaDB = Schema('User', {
  id: { type: String, required: true },
  user: { type: String, required: true },
  password: { type: String, required: true }
});

export class userRepository {
  static async create({ user, password }) {
    const id = crypto.randomUUID();

    // Validation
    const res = userSchemaValidation.safeParse({
      id,
      user,
      password
    });

    if (res.error) throw new Error(`Validation error: ${res.error.message}`);

    const userFind = userSchemaDB.findOne({ user });

    if (userFind) throw new Error('User already exists!');

    // Gen Hash Password
    const hashedPassword = await bcript.hash(
      password,
      parseInt(process.env.SAULT_ROUND)
    );

    userSchemaDB.create({ id, user, password: hashedPassword }).save();

    return {
      id: id,
      user: user
    };
  }

  static async login({ user, password }) {
    const userFind = userSchemaDB.findOne({ user });

    if (!userFind) throw new Error('User does not exist!');

    // Validation
    const res = userSchemaValidation.safeParse({
      id: userFind.id,
      user,
      password
    });

    if (res.error) throw new Error(`Validation error: ${res.error.message}`);

    const isValidPassword = await bcript.compare(password, userFind.password);

    if (!isValidPassword) throw new Error('Invalid password!');

    return {
      id: userFind.id,
      user: userFind.user
    };
  }
}

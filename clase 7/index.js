import express from 'express';
import dotenv from 'dotenv/config';
import { userRepository } from './Repository/user-repository.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import setJWTCookie from './auth.js';
import morgan from 'morgan';

const app = express();
app.disable('x-powered-by');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use((req, res, next) => {
  req.session = { user: null };

  try {
    const token = req.cookies.access_token;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.session.user = data;
  } catch (error) {}

  next();
});

const PORT = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
  // console.log('INGRESO RAIZ :>> ', new Date().toLocaleString());
  const { user } = req.session;
  res.render('index', { user });
});

app.post('/login', async (req, res) => {
  try {
    const { user, password } = req.body;

    const userLogged = await userRepository.login({ user, password });

    setJWTCookie(userLogged, res);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

app.post('/register', async (req, res) => {
  try {
    const { user, password } = req.body;

    const userRegistered = await userRepository.create({ user, password });

    setJWTCookie(userRegistered, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/logout', (req, res) => {
  req.session.user = null;
  res.clearCookie('access_token');
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

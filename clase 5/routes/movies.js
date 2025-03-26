import { Router } from 'express';
import { MoviesController } from '../controllers/moviesController.js';

export const moviesRouter = Router();

moviesRouter.get('/', MoviesController.getAll);
moviesRouter.get('/all', MoviesController.getAll);
moviesRouter.get('/:id', MoviesController.getById);
moviesRouter.post('/', MoviesController.create);
moviesRouter.patch('/:id', MoviesController.update);
moviesRouter.delete('/:id', MoviesController.delete);

import { Router } from 'express';
import { MoviesController } from '../controllers/moviesController.js';

export const createMoviesRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movieController = new MoviesController({ movieModel });

  moviesRouter.get('/', movieController.getAll);
  moviesRouter.get('/all', movieController.getAll);
  moviesRouter.get('/:id', movieController.getById);
  moviesRouter.post('/', movieController.create);
  moviesRouter.patch('/:id', movieController.update);
  moviesRouter.delete('/:id', movieController.delete);

  return moviesRouter;
};

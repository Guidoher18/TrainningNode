import z from 'zod';

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: 'Poster must be a valid url'
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Animation',
      'Biography',
      'Crime',
      'Drama',
      'Fantasy',
      'Romance',
      'Sci-Fi',
      'Thriller'
    ])
  )
});

export function validateMovie (obj) {
  return movieSchema.safeParse(obj);
}

export function validatePartialMovie (obj) {
  return movieSchema.partial().safeParse(obj);
}

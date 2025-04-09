import z from 'zod';

export const userSchemaValidation = z.object({
  /* id, username, password */
  id: z
    .string({
      invalid_type_error: 'Id must be a string'
    })
    .min(3, {
      message: 'Id must be at least 3 characters long'
    }),
  user: z
    .string({
      invalid_type_error: 'Username must be a string'
    })
    .min(6, {
      message: 'Username must be at least 6 characters long'
    }),
  password: z.string({
    invalid_type_error: 'Password must be a string'
  })
});

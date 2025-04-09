import jwt from 'jsonwebtoken';

const setJWTCookie = (user, res) => {
  // Generate JWT
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  // Set Cookie
  res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    })
    .json(user);
};

export default setJWTCookie;

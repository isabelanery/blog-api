require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });

    return token;
  },
  validateToken: (token) => {
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET);

      return data;
    } catch (_err) {
      const e = new Error('Expired or invalid token');
      e.name = 'UnauthorizedError';
      throw e;
    }
  },
};

module.exports = jwtService;

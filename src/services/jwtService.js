require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (user) => {
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
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
      const e = new Error('Token inválido');
      e.name = 'UnauthorizedError';
      throw e;
    }
  },
};

module.exports = jwtService;

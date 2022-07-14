// const Joi = require('joi');
// const db = require('../database/models');

// const newUser = async (req, _res, next) => {
//   const { displayName, email, password, image } = req.body;

//   const schema = Joi.object({
//     displayName: Joi.string().min(8).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).required(),
//   });

//   const { error } = schema.validate({ displayName, email, password, image });

//   // if (error) throw error;
// console.log(error);
  

//   next();
// };

// module.export = {
//   newUser,
// };

const { Router } = require('express');
const rescue = require('express-rescue');
const authController = require('../controllers/authController');

const router = Router();

router
  .post('/', rescue(authController.login));

module.exports = router;
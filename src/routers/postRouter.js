const { Router } = require('express');
const rescue = require('express-rescue');
const authController = require('../controllers/authController');

const postController = require('../controllers/postController');

const router = Router();

router.route('/')
  .post(
    rescue(authController.validateToken),
    rescue(postController.create),
  );

  module.exports = router;
const { Router } = require('express');
const rescue = require('express-rescue');
const authController = require('../controllers/authController');

const postController = require('../controllers/postController');

const router = Router();

router.route('/')
  .post(
    rescue(authController.validateToken),
    rescue(postController.create),
  )
  .get(
    rescue(authController.validateToken),
    rescue(postController.list),
  );

router.route('/:id')
  .get(
    rescue(authController.validateToken),
    rescue(postController.findById),
  )
  .put(
    rescue(authController.validateToken),
    rescue(postController.update),
  )
  .delete(
    rescue(authController.validateToken),
    rescue(postController.remove),
  );

  module.exports = router;
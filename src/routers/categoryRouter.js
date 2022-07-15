const { Router } = require('express');
const rescue = require('express-rescue');
const authController = require('../controllers/authController');

const categoryController = require('../controllers/categoryController');

const router = Router();

router.route('/')
  .post(
    rescue(authController.validateToken),
    rescue(categoryController.create),
  )
  .get(
    rescue(authController.validateToken),
    rescue(categoryController.list),
  );

module.exports = router;
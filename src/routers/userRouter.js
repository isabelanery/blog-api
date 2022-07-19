const { Router } = require('express');
const rescue = require('express-rescue');
const authController = require('../controllers/authController');

const userController = require('../controllers/userController');

const router = Router();

router.route('/')
  .get(rescue(authController.validateToken), rescue(userController.list))
  .post(rescue(userController.create));

router.delete('/me', 
  rescue(authController.validateToken),
  rescue(userController.remove));

router.get('/:id', 
  rescue(authController.validateToken),
  rescue(userController.findById));

module.exports = router;
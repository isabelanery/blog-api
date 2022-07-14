const { Router } = require('express');

const userController = require('../controllers/userController');

const router = Router();

router.route('/')
  .get(userController.list)
  .post(userController.create);

module.exports = router;
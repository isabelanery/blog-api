const { Router } = require('express');
const rescue = require('express-rescue');

const userController = require('../controllers/userController');

const router = Router();

router.route('/')
  .get(userController.list)
  .post(rescue(userController.create));

module.exports = router;
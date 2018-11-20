const express = require('express');
const teamController = require('../controllers/teamController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/list', teamController.list);

router.post('/new', teamController.new);

router.post('/:id/update', teamController.update);

router.delete('/:id/delete', teamController.delete);

router.get('/:id/get', teamController.get);

module.exports = router;
const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/list', projectController.list);

router.post('/new', projectController.new);

router.post('/:id/update', projectController.update);

router.delete('/:id/delete', projectController.delete);

router.get('/:id/get', projectController.get);

module.exports = router;
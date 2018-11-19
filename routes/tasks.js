const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/list', taskController.list);

router.post('/new', taskController.new);

router.post('/:id/update', taskController.update);

// router.delete('/:id/delete', taskController.delete);

// router.get('/:id/get', taskController.get);

module.exports = router;
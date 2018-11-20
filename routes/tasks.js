const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/list',
    authController.authenticate,
    taskController.list
);

router.post('/new',
    authController.authenticate,
    taskController.new
);

router.post('/:id/update',
    authController.authenticate,
    taskController.update
);

router.delete('/:id/delete',
    authController.authenticate,
    taskController.delete
);

router.get('/:id/get',
    authController.authenticate,
    taskController.get
);

module.exports = router;
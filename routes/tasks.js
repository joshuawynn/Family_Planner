const express = require('express');
const router = express.Router();
const tasksCtrl = require('../controllers/tasks');


// POST /members/:id/tasks (create task for a family member)
router.post('/members/:id/tasks', tasksCtrl.create);

// Delete /reviews/:id
router.delete('/tasks/:id', tasksCtrl.delete);

module.exports = router;
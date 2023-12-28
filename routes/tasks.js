const express = require('express');
const router = express.Router();
const tasksCtrl = require('../controllers/tasks');


// POST /members/:id/tasks (create task for a family member)
router.post('/members/:id/tasks', tasksCtrl.create);

// Delete /tasks/:id
router.delete('/members/:mid/tasks/:id', tasksCtrl.delete);

module.exports = router;
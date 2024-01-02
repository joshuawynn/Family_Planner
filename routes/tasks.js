const express = require('express');
const router = express.Router();
const tasksCtrl = require('../controllers/tasks');


// POST /members/:id/tasks (create task for a family member)
router.post('/members/:id/tasks', tasksCtrl.create);

// Delete /tasks/:id
router.delete('/members/:mid/tasks/:id', tasksCtrl.delete);

// Add route for rendering the update task form
router.get('/members/:mid/tasks/:id/update', tasksCtrl.renderUpdateTaskForm);

// Add route for updating a task
router.post('/members/:mid/tasks/:id/update', tasksCtrl.updateTask);


module.exports = router;
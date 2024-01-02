const express = require('express');
const router = express.Router();
const schedulesCtrl = require('../controllers/schedules');


// POST /movies/:id/reviews (create review for a movie)
router.post('/members/:id/schedules', schedulesCtrl.create);

// Delete /schedules/:id
router.delete('/members/:mid/schedules/:id', schedulesCtrl.delete);

// Add route for rendering the update task form
router.get('/members/:mid/schedules/:id/update', schedulesCtrl.renderUpdateSchedulesForm);

// Add route for updating a task
router.post('/members/:mid/schedules/:id/update', schedulesCtrl.updateTask);



module.exports = router;
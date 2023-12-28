const express = require('express');
const router = express.Router();
const schedulesCtrl = require('../controllers/schedules');


// POST /movies/:id/reviews (create review for a movie)
router.post('/members/:id/schedules', schedulesCtrl.create);

// Delete /reviews/:id
router.delete('/schedules/:id', schedulesCtrl.delete);

module.exports = router;
var express = require('express');
var router = express.Router();

// You'll be creating this controller module next
const membersCtrl = require('../controllers/members');


// GET /members
router.get('/', membersCtrl.index);

/* GET /members/new */
router.get('/new', membersCtrl.new); 
// GET /members/:id (show functionality) MUST be below new route
router.get('/:id', membersCtrl.show);
// POST /members
router.post('/', membersCtrl.create);


module.exports = router;
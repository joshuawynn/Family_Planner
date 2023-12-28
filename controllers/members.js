const Member = require('../models/member')

async function index(req, res){
    const members = await Member.find({});
    res.render('members/index', { title: 'Family Members', members});
}

async function show(req, res) {
    // Populate the cast array with performer docs instead of ObjectIds
    const member = await Member.findById(req.params.id);
    res.render('members/show', { title: 'Family Member View', member});
  }

function newMember(req, res) {
    // We'll want to be able to render an
    // errorMsg if the create action fails
    res.render('members/new', { title: 'Add Family Member', errorMsg: '' });
}

async function create(req, res) {
    // convert feelingSick's checkbox of nothing or "on" to boolean
    req.body.feelingSick = !!req.body.feelingSick;
    //remove any whitespace at start and end of cast
    req.body.hobby = req.body.hobby.trim();
    // split hobby into an array if it's not an empty string - using a regular expression as a separator
    if (req.body.hobby) req.body.hobby = req.body.hobby.split(/\s*,\s*/);
    try {
        await Member.create(req.body);
        // Always redirect after CUDing data
        // We'll refactor to redirect to the members index after we implement it
        res.redirect('/members');
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('members/new', { errorMsg: err.message });

    }
}

module.exports = {
    index,
    show,
    new: newMember,
    create
};
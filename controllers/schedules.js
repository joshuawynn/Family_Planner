const Member = require('../models/member');


async function deleteSchedule(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Member.findOne({
    'schedules._id': req.params.id,
    'schedules.user': req.user._id
  }).then(function (member) {
    if (!member) return res.redirect('/members');
    member.schedules.remove(req.params.id);
    member.save().then(function () {
      res.redirect(`/members/${member._id}`);
    }).catch(function (err) {
      return next(err);
    });
  });
}


async function create(req, res) {
  const member = await Member.findById(req.params.id);
  // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  member.schedules.push(req.body);
  try {
    // Save any changes made to the movie doc
    await member.save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/members/${member._id}`);
}

module.exports = {
  create,
  delete: deleteSchedule
};

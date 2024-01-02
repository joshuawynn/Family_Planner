const Member = require('../models/member');

async function deleteSchedule(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  try {
  const member = await Member.findById(req.params.mid)
  if (!member) return res.redirect('/members');
  member.schedules.remove(req.params.id);
  await member.save()
  res.redirect(`/members/${member._id}`);
} catch (error) {
  console.error("Error deleting schedule:", error);
  res.status(500).send("Internal Server Error");
}
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


async function renderUpdateScheduleForm (req, res) {
  try {
    const member = await Member.findById(req.params.mid);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Find the schedule within the member
    const schedule = member.schedules.find(schedule => schedule._id == req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.render('members/update-schedule-form', {title: 'Update Schedule', member, schedule });
  } catch (error) {
    console.error('Error rendering update schedule form:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

async function updateSchedule(req, res) {
  const { mid, id } = req.params;
  const { content, scheduleDate } = req.body;

  try {
    const member = await Member.findById(mid);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Find the schedule within the member and update it
    const scheduleIndex = member.schedules.findIndex(schedule => schedule._id == id);

    if (scheduleIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    member.schedules[scheduleIndex].content = content;
    member.schedules[scheduleIndex].scheduleDate = scheduleDate;

    await member.save();

     // Redirect back to the show page after updating the task
     return res.redirect(`/members/${mid}`);

    // Handle the updated task, send a response, etc.
    return res.status(200).json(member.schedules[scheduleIndex]);
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {
  create,
  delete: deleteSchedule,
  updateSchedule,
  renderUpdateScheduleForm
};

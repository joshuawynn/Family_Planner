const Member = require('../models/member');


async function deleteTask(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const member = await Member.findById(req.params.mid)
  if (!member) return res.redirect('/members');
  member.tasks.remove(req.params.id);
  await member.save()
  res.redirect(`/members/${member._id}`);
}


async function create(req, res) {
  const member = await Member.findById(req.params.id);
  // Add the user-centric info to req.body (the new review)
     req.body.user = req.user._id;
     req.body.userName = req.user.name;
     req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  member.tasks.push(req.body);
  try {
    // Save any changes made to the movie doc
    await member.save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/members/${member._id}`);
}

async function renderUpdateTaskForm (req, res) {
  try {
    const member = await Member.findById(req.params.mid);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Find the task within the member
    const task = member.tasks.find(task => task._id == req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.render('members/update-task-form', {title: 'Update Task', member, task });
  } catch (error) {
    console.error('Error rendering update task form:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

async function updateTask(req, res) {
  const { mid, id } = req.params;
  const { content, taskDate } = req.body;

  try {
    const member = await Member.findById(mid);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Find the task within the member and update it
    const taskIndex = member.tasks.findIndex(task => task._id == id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    member.tasks[taskIndex].content = content;
    member.tasks[taskIndex].taskDate = taskDate;

    await member.save();

     // Redirect back to the show page after updating the task
     return res.redirect(`/members/${mid}`);

    // Handle the updated task, send a response, etc.
    return res.status(200).json(member.tasks[taskIndex]);
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {
  create,
  delete: deleteTask,
  updateTask,
  renderUpdateTaskForm
}; 

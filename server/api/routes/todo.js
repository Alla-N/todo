const express = require('express');
const Router = express.Router;
const router = new Router;
const Todo = require('../models/Todo');

router.get('/todo', (req, res) => {
  Todo.find({userId: '1'})
    .then((todos) => {
      res.status(200).json(todos);
    })
    .catch((err) => {
      return res.status(404).json({status: err.name});
    });
});

router.post('/todo', async (req, res) => {
  try {
    let newTodo = await new Todo({
      userId: '1',
      title: req.body.title,
      completed: false,
      deadline: req.body.deadline,
      priority: req.body.priority,
    });

    await newTodo.save();

    res.status(200).json({todo: newTodo, message: 'New task created'});
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e.name})
  }

});

router.put('/todo/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {title, deadline, priority} = req.body;

    await Todo.findByIdAndUpdate(id,
      {
        title: title,
        deadline: deadline,
        priority: priority
      },
      {new: true, useFindAndModify: false},
      function (err, result) {
        if (err) {
          console.log(err);
          res.status(404).json({status: err.name});
        } else {
          res.status(200).json({todo: result, message: 'Edit is successful'});
        }
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e.name})
  }
});

router.put('/todo/:id/complete', async (req, res) => {
  try {
    const {id} = req.params;
    const {completed} = req.body;

    await Todo.findByIdAndUpdate(id,
      {
        completed: completed
      },
      {new: true, useFindAndModify: false},
      function (err, result) {
        if (err) {
          res.status(404).json({status: err.name});
        } else {
          res.status(200).json({todo: result, message: 'Edit is successful'});
        }
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e.name})
  }
});

router.delete('/todo/:id', async (req, res) => {
  try {
    const {id} = req.params;

    await Todo.findByIdAndDelete(id,
      function (err, result) {
        if (err) {
          console.log(err);
          res.status(404).json({status: err.name});
        } else {
          res.status(200).json({message: 'Task deleted'});
        }
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e.name})
  }
});


module.exports = router;

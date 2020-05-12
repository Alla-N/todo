const express = require('express');
const Router = express.Router;
const router = new Router;
const Todo = require('../models/Todo');

router.get('/todo', async (req, res) => {
    try {
        await Todo.find({userId: '1'})
            .then((todos) => {
                res.status(200).json(todos);
            })
            .catch((err) => {
                return res.status(404).json({status: err.name});
            });
    } catch (e) {
        return res.status(404).json({status: e.name});
    }
});

router.post('/todo', async (req, res) => {
    try {
        let newTodo = await new Todo({
            userId: '1',
            title: req.body.title,
            completed: false,
            deadline: new Date(Date.parse(req.body.deadline)),
            priority: req.body.priority,
        });

        await newTodo.save();

        res.status(200).json({todo: newTodo, message: 'New task created'});
    } catch (e) {
        res.status(500).json({message: e.name})
    }

});

router.put('/todo/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {title, priority} = req.body;
        const deadline = new Date(Date.parse(req.body.deadline));

        await Todo.findByIdAndUpdate(id,
            {
                title: title,
                deadline: deadline,
                priority: priority
            },
            function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(404).json({status: err.name});
                } else {
                    res.status(200).json({message: 'Edit is successful'});
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

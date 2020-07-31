const express = require('express');
const mongoose = require('mongoose');

// DB Connection
require('./db/mongoose');

// Models
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.route('/', (req, res) => {
    res.send('Hello, welcome to my API!');
});

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(() => {
            res.send(user);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
});

app.get('/users', (req, res) => {
    User.find({})
        .then((users) => {
            res.send(users);
        })
        .catch((e) => {
            res.status(500).send(e);
        });
});

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.send(user);
        })
        .catch((e) => {
            if (!mongoose.Types.ObjectId.isValid(e.value)) {
                return res.status(404).send(e);
            }
            res.status(500).send(e);
        });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save()
        .then(() => {
            res.send(task);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
});

app.get('/tasks', (req, res) => {
    Task.find({})
        .then((tasks) => {
            res.send(tasks);
        })
        .catch((e) => {
            res.status(500).send(e);
        });
});

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id)
        .then((task) => {
            if (!task) {
                return res.status(404).send('Task not found');
            }
            res.send(task);
        })
        .catch((e) => {
            if (!mongoose.Types.ObjectId.isValid(e.value)) {
                return res.status(404).send(e);
            }
            res.status(500).send(e);
        });
});

app.listen(port, () => console.log(`Server is up on port ${port}`));

const express = require('express');
const mongoose = require('mongoose');

// DB Connection
require('./db/mongoose');

// Routes
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
const port = process.env.PORT || 3000;

// "Env variables"
const MAINTENANCE_MODE = false;

// Maintenance mode
app.use((req, res, next) => {
    if (MAINTENANCE_MODE) {
        res.status(503).send('Under maintenance...');
    } else {
        next();
    }
});

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Server is up on port ${port}`));

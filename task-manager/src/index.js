const express = require('express');
const mongoose = require('mongoose');

// DB Connection
require('./db/mongoose');

// Routes
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
const port = process.env.PORT;

// Maintenance mode
app.use((req, res, next) => {
    if (process.env.MAINTENANCE_MODE) {
        res.status(503).send('Under maintenance...');
    } else {
        next();
    }
});

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Server is up on port ${port}`));

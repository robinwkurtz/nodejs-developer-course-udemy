const mongoose = require('mongoose');

mongoose.connect(
    `${process.env.MONGOOSE_CONNECTION_URL}/${process.env.MONGOOSE_DATABASE_NAME}`,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
);

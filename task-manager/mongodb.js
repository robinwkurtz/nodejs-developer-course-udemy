const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'Robin',
    //     age: 28
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }

    //     const user = result.ops[0];
    //     console.log(user);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert users');
    //     }

    //     const users = result.ops;
    //     console.log(users);
    // });

    db.collection('tasks').insertMany([
        {
            description: 'Watch video',
            completed: true
        },
        {
            description: 'Do challenge',
            completed: true
        },
        {
            description: 'Do next step',
            completed: false
        },
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks');
        }

        const users = result.ops;
        console.log(users);
    })
});

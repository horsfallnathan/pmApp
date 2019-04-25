// Seeds file that remove all data and create 2 new data

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const Data = require('../models/Data');

mongoose
    .connect('mongodb://localhost/core', { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch(err => {
        console.error('Error connecting to mongo', err);
    });

let data = [
    {
        dataName: 'ProjectA',
        numberOfTasks: 6,
        toDO: 1,
        onGoing: 2,
        completed: 3
    },
    {
        dataName: 'Project2',
        numberOfTasks: 6,
        toDO: 1,
        onGoing: 2,
        completed: 3
    },
    {
        dataName: 'Project5',
        numberOfTasks: 6,
        toDO: 1,
        onGoing: 2,
        completed: 3
    }
];

Data.deleteMany()
    .then(() => {
        return Data.create(data);
    })
    .then(dataCreated => {
        console.log(`${dataCreated.length} data created with the following id:`);
        console.log(dataCreated.map(u => u._id));
    })
    .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect();
    })
    .catch(err => {
        mongoose.disconnect();
        throw err;
    });

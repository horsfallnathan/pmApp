const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    dataName: String,
    numberOfTasks: {
        type: Number,
        default: 0
    },
    toDO: {
        type: Number,
        default: 0
    },
    onGoing: {
        type: Number,
        default: 0
    },
    completed: {
        type: Number,
        default: 0
    }
});

const Data = mongoose.model('data', dataSchema);
module.exports = Data;

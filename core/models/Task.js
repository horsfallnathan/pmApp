const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        title: String,
        Description: String,
        assignedTo: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        weight: Number,
        status: {
            type: String,
            enum: ['Todo', 'Ongoing', 'Completed']
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const Task = mongoose.model('Project', taskSchema);
module.exports = Task;

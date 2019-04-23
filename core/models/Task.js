const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        title: String,
        description: String,
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
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

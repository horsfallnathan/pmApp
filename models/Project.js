const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        projectName: String,
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task'
            }
        ],
        assignedTo: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        weight: {
            type: Number,
            default: 1
        },
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

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

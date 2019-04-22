const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        username: String,
        password: String,
        role: {
            type: String,
            enum: ['Admin', 'Project Lead', 'Team Member'],
            default: 'Admin'
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;

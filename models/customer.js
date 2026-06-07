const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'Customer'
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'active', 'inactive'],
        default: 'active'
    },
    joined: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);

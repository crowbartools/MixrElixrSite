const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emoteRequestSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    approver: {
        type: String,
        trim: true
    },
    emotes: {
        type: Array,
        requred: true
    }
}, {
    timestamps: true
});

const emoteRequest = mongoose.model('Requests', emoteRequestSchema);

module.exports = emoteRequest;
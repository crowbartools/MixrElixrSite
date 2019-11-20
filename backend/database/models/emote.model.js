const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const emoteSchema = new Schema({
    ownerId: {
        type: Number,
        required: true,
        trim: true
    },
    shared: {
        type: Boolean,
        required: true,
        trim: true,
        default: false
    },
    command: {
        type: String,
        trim: true,
        required: true
    },
    filename: {
        type: String,
        trim: true,
        required: true
    },
    request:{
        status: {
            type: String,
            trim: true,
            required: true,
            default: "Pending"
        },
        approver: {
            type: String,
            trim: true,
            default: ''
        },
        date: {
            type: String,
            trim: true,
            required: true,
            default: moment().toISOString()
        }
    },
    meta: {
        channels: {
            type: Number,
            trim: true,
            required: true,
            default: 1
        }
    }
}, {
    timestamps: true
});

const emote = mongoose.model('Emote', emoteSchema);

module.exports = emote;
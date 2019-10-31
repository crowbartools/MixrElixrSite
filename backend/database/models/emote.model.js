const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emoteSchema = new Schema({
    emoteId: {
        type: Number,
        required:true,
        unique: true,
        trim: true
    },
    ownerId: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    shared: {
        type: Boolean,
        required: true,
        trim: true,
        default: false
    },
    approver: {
        type: String,
        trim: true,
        required: true
    },
    url: {
        type: String,
        trim: true,
        required: true
    },
    uses: {
        type: Number,
        trim: true,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const emotes = mongoose.model('Emotes', emoteSchema);

module.exports = emotes;
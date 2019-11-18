const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    channelId: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    emotes: {
        type: Array,
        default: [],
        required: true
    },
    account: {
        level: {
            type: String,
            default: "User",
            required: true,
            trim: true,
            minlength: 1
        },
        status: {
            type: String,
            default: "Active",
            required: true,
            trim: true,
            minlength: 1
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
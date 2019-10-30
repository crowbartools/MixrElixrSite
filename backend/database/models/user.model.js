const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    accountStatus: {
        type: String,
        default: "User"
    },
    banned: {
        type: Boolean,
        default: false
    },
    emotes: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
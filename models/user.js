const mongoose = require('mongoose');
const passportportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(passportportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
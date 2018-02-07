const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hash_password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});

UserSchema.methods.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password,hash);
}

mongoose.model('user',UserSchema);

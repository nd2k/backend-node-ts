"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String,
        required: 'Enter an email'
    },
    password: {
        type: String,
        required: 'Enter a password'
    },
    password2: {
        type: String,
        required: 'Re-enter your password'
    },
    imageUrl: {
        type: String,
        default: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjEgMHM_ZnnAhUQtosKHWdTCmsQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D2ahUKEwj1z6bJ_ZnnAhWRtYsKHZ1eD_kQjRx6BAgBEAQ%26url%3Dhttps%253A%252F%252Fwww.pikpng.com%252Fpngvi%252FbJoTbo_my-profile-icon-blank-profile-picture-circle-hd%252F%26psig%3DAOvVaw38Hp0nuM4RjamGEX9N2wM9%26ust%3D1579877762744385&psig=AOvVaw38Hp0nuM4RjamGEX9N2wM9&ust=1579877762744385'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = require("bcryptjs");
class UserController {
    addNewUser(req, res) {
        const { lastName, firstName, email, password, password2, imageUrl } = req.body;
        let newUser = new user_model_1.default({ lastName, firstName, email, password, imageUrl });
        let errors = [];
        // Check required fields
        if (!firstName || !lastName || !email || !password || !password2) {
            errors.push({ message: 'Please, fill in all mandatory fields' });
            res.send(errors);
        }
        if (password !== password2) {
            errors.push({ message: 'Passwords do not match' });
            res.send(errors);
        }
        if (password.length < 4) {
            errors.push({ message: 'Password must be at least 4 charaters' });
            res.send(errors);
        }
        else {
            // Validation passes
            // Check for existing user
            user_model_1.default.find({ email: email }).then((user) => {
                if (user) {
                    errors.push({ message: `User's email already exists` });
                    // res.send(errors);
                    res.send(user);
                }
                else {
                    bcryptjs_1.default.genSalt(10, (err, salt) => {
                        bcryptjs_1.default.hash(newUser.password, salt, (error, hash) => {
                            if (error)
                                throw error;
                            newUser.password = hash;
                            newUser.save((error, user) => {
                                if (error) {
                                    res.send(error);
                                }
                                else {
                                    res.json(user);
                                }
                            });
                        });
                    });
                }
            });
        }
    }
    getUsers(req, res) {
        user_model_1.default.find({}, (error, user) => {
            if (error) {
                res.send(error);
            }
            else {
                res.json(user);
            }
        });
    }
    getUser(req, res) {
        user_model_1.default.findById(req.params.userId, (error, user) => {
            if (error) {
                res.send(error);
            }
            else {
                res.json(user);
            }
        });
    }
    updateUser(req, res) {
        user_model_1.default.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (error, user) => {
            if (error) {
                res.send(error);
            }
            else {
                res.json(user);
            }
        });
    }
    deleteUser(req, res) {
        user_model_1.default.remove({ _id: req.params.userId }, (error, user) => {
            if (error) {
                res.send(error);
            }
            else {
                res.json({
                    message: 'User is successfully deleted'
                });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
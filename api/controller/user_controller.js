const User = require('../model/user')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Joi = require('joi');

exports.user_register = (req, res, next) => {
    const schema =
        Joi.object({
            username: Joi.string().min(3).max(12).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            employeeID: Joi.string().length(4).required()
        });
    const result = schema.validate(req.body)
    if (result.error) {

        res.status(400).json({
            message: result.error.details[0].message,
        });
    }
    else {
        User.find({
            email: req.body.email
        }).exec().then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "user already exist"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            phoneNumber: req.body.phoneNumber,
                            employeeID: req.body.employeeID
                        });
                        user.save().
                            then(
                                result => {

                                    res.status(201).json({
                                        message: 'user created ',
                                        user: result
                                    });
                                    console.log(result);
                                }
                            ).
                            catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    message: err,
                                    user: null
                                });

                            }

                            );
                    }
                }
                );
            }
        }).
            catch(err => {
                console.log(err);
                res.status(500).json({
                    message: err,
                });
            });

    }
}

exports.user_login = (req, res, next) => {
    const schema =
        Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        });
    const result = schema.validate(req.body)
    if (result.error) {
        res.status(400).json({
            message: result.error.details[0].message,
        });
    }
    else {
        User.find({
            email: req.body.email
        }).exec().then(user => {
            if (user.length >= 1) {
                bcrypt.compare(req.body.password, user[0].password, (error, result) => {

                    if (result) {
                        // const token = jwt.sign({
                        //     email: user[0].email, userId: user[0]._id
                        // }, process.env.Token_KEY, {
                        //     expiresIn: "1hr"
                        // });
                        const response = new User({
                            _id: user[0]._id,
                            email: user[0].email,
                            password: user[0].password,
                            username: user[0].username,
                            employeeID: user[0].employeeID,
                            phoneNumber: user[0].phoneNumber,
                          //  token: token
                        });
                        return res.status(200).json({
                            message: 'user data fetched ',
                            user: response
                        });
                    }
                    else {
                        return res.status(401).json({
                            message: "Password does not match"
                        })

                    }
                });
            } else {
                return res.status(401).json({
                    message: "Couldnt find the email id  "
                })
            }
        }).
            catch(err => {
                console.log(err);
                res.status(500).json({
                    message: err,
                });
            });

    }
}

exports.user_delete = (req, res, next) => {
    console.log(req.params.id);
    User.remove({ _id: req.params.userId }).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'user deleted ',
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    });
}

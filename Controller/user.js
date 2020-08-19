const Customer = require('../models/customerSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema');

exports.adminsignup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            let admin = new Admin({
               name:req.body.name,
                phone:req.body.phone,
                email:req.body.email,
                password:hash
            });
            admin.save().then(
                () => {
                    res.status(201).json({
                        message: 'Admin added successfully'
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    })
                }
            );
        }
    );
};

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            let customer = new Customer({
                name:req.body.name,
                phone:req.body.phone,
                email:req.body.email,
                city:req.body.city,
                addedby:req.body.user,
                password:hash
                //venue type nhi h idher
            });
            customer.save().then(
                () => {
                    res.status(201).json({
                        message: 'User added successfully'
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    })
                }
            );
        }
    );
};



exports.login = (req, res, next) => {
    Customer.findOne({ email: req.body.email }).then(
        (user) => {
            if(!user){
                return res.status(401).json({
                    message: 'User not found'
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if(!valid){
                        return res.status(401).json({
                            message: 'Incorrect Password'
                        });
                    }

                    const token = jwt.sign(
                        {userId: user._id},
                        'Random secret key',
                        { expiresIn: '150h' }
                    );

                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    })
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            })
        }
    );
};

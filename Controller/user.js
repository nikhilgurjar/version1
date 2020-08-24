const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = mongoose.model('Admin');
const Customer = mongoose.model('Customer');
const customer = require('../Middleware/Utility')
exports.adminsignup = async (req, res, next) => {
const {name,phone,email,password} = req.body;
    if (!phone || !password || !name || !email) {

        return res.status(401).send("please fill all details");
    }
    try {
        const user = await Admin.findOne({ email: email });
        if (user) {
            // console.log(user)
            return res.status(422).send("User already exist with this email");

        }
        const hash = await customer.hashPassword(password);
        let newUser = await new Admin({
            name: name,
            email: email,
            password: hash,
            phone:phone

        });
        await newUser.save();
        const token = await customer.tokencreator(newUser._id);
        return res.status(200).send({token,newUser});
    } catch (error) {
        res.status(422).send(error);
    }

};

exports.signup = async (req, res, next) => {

    const {name,phone,email,password,addedby,city,user} = req.body;
    if (!phone || !password || !name || !email || !addedby || !city) {

        return res.status(401).send("please fill all details");
    }
    try {
        const newuser = await Customer.findOne({ email: email });
        if (newuser) {
            // console.log(newuser)
            return res.status(422).send("Customer already exist with this email");

        }
        const hash = await customer.hashPassword(password);
        let newUser = await new Customer({
            name: name,
            email: email,
            password: hash,
            phone:phone,
            city:city,
            addedby:newuser

        });
        await newUser.save();
        const token = await customer.tokencreator(newUser._id);
        return res.status(200).send({token,newUser});
    } catch (error) {
     return res.status(422).send(error);
    }

};



exports.login = async (req, res, next) => {
    const {email,password} = req.body
    let user;
    if(req.query.role==='customer'){
        user = await Customer.findOne({ email:email});
    }
    else{
        user = await Admin.findOne({email:email});
    }
    if (!user) {
        return res.status(201).send("Please Enter Correct Details");
    }
    try {
// console.log(password,user)
        await customer.verifyPassword(password, user.password, async (err, isMatch) => {
            if (err) {
                // console.log(err)
                return res.status(201).send(err);}
            if (isMatch) {
                const token = await customer.tokencreator(user._id);
                console.log(user,token)
                return res.status(200).json({token,user});
            }
        });
    } catch (error) {
        // console.log(error)
       return res.status(500).send(error);
    }

};

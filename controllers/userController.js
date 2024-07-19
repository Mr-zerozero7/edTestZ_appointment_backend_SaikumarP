const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const {generateToken} = require('./authController');
const validator = require('validator');

const salt = bcrypt.genSaltSync(10);

const createUser = async (req, res) =>{
    const {username,email,password} = req.body;
    
    try {
        // check require inputs
        if(!email || !password){
            return res.status(400).json({errorMsg: 'Email and Password required'})
        }
        //Find User Details by Email
        const emailCheck = await User.findOne({where: {email}});
        if(emailCheck){
            return res.status(404).json({errorMsg: 'User already Registered...'})
        }

        // validate eamil
        if(!validator.isEmail(email)){
            return res.status(400).json({errorMsg: 'Please Enter Valid Email'})
        }
        // Validate Password
        if(!validator.isLength(password, {min: 6})){
            return res.status(400).json({errorMsg: 'Password must be at least 6 char long'})
        }

        const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if(!symbolRegex.test(password)){
            return res.status(400).json({errorMsg: 'Password must contain at least 1 symbol'})
        }
        
        // Hash Password
        const hasedPassword =await bcrypt.hashSync(password, salt);
        const user = await User.create({username, email, password: hasedPassword});

        //Generate JWT Token
        const token = generateToken(user);
        // const token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET_KEY, {expiresIn: '1d'});
        res.status(201).json({message:'user created successfully', username, token});

    } catch (error) {
        console.log('Error creating user:', error.message);
        res.status(500).json({error: error.message});
    }
};

const loginUser = async(req, res) => {
    const {email, password} = req.body
    try {
        //Find User Details by Email
        const user = await User.findOne({where: {email}});
        if(!user){
            return res.status(404).json({errorMsg: 'User Not Found...'})
        }

        // Check Password Match
        const comparePass = await bcrypt.compareSync(password, user.password)
        if(!comparePass){
            res.status(404).json({msg: 'Please Enter Correct Password'})
        }

        const token = generateToken(user)
        // const token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET_KEY, {expiresIn: '1d'});
        const {username} = user

        //handle Successfull Login
        res.status(200).json({message: 'Login Successfull', username, token})
    } catch (error) {
        console.log('Error fetching users:', error.message);
        res.status(500).json({error: 'Internal Server error'});
    }
};

module.exports = {createUser, loginUser};
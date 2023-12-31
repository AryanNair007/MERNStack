import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/usersModel.js';

//@desc Registers new users
//@route POST /api/user
//@accss Public
const  registerUser = asyncHandler (
    async (req, res) => {
        console.log(req.body)
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            res.status(400);
            throw new Error("Please add all fields")
        }

        //check if user exists
        const userExists = await User.findOne({email})
        if (userExists){
            res.status(400);
            throw new Error("user already exists");
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if(user){
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
    )
    //@desc Authenticate a users
    //@route POST /api/user/login
    //@accss Public
 const loginUser = asyncHandler (
    async (req, res) => {
        const { email, password } = req.body
        
        //Check for user email
        const user = await User.findOne({email})
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
)
//@d)esc Get users data
//@route GET /api/user/me
//@accss Private
 const getMe = asyncHandler (
    async (req, res) => {
        const { _id, name, email } = await User.findById(req.user.id);
        res.status(200).json({
            id: _id,
            name,
            email,
        })
    }
)

//Generate JWT
const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export {
    registerUser,
    loginUser,
    getMe
}


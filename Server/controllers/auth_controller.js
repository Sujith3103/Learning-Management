const User = require('../models/user');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) => {

    const{userName,userEmail,password} = req.body;

    // if(!userName || !userEmail || !password){
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Please fill all the fields',
    //     })
    // }

    const existingUser = await User.findOne({
        $or: [{userEmail}, {userName}],
    })

    if(existingUser) {
       return res.status(400).json({
        success: false,
        message: 'User already exists',
       })}
    
    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            userName,
            userEmail,
            password: hashedPassword,
        })

        const {password:_, ...user} = newUser._doc

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }

    
}

const loginUser = async (req, res) => {
}

module.exports = registerUser, loginUser;
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');    

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
        console.log(user)

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
    const {userEmail, password} = req.body;
    
    const findUser = await User.findOne({userEmail})

    if(!findUser){
        return res.status(400).json({
            success: false,
            message: 'User not found'
        })
    }

    const isPasswordValid =  bcrypt.compare(password, findUser.password)

    if(!isPasswordValid){
        return res.status(400).json({
            success : false,
            message : 'invalid password'
        })
    }
    
    console.log("User found : ", findUser)
    const {password:_, ...user} = findUser._doc;
    console.log(user)

    const accessToken = jwt.sign({
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        role: user.role
    },process.env.JWT_SECRET, { expiresIn: '120m'})

    return res.status(200).json({
        success: true,
        message: 'user logged in successfully',
        data : {
            user,
            accessToken
        }

    })
}

module.exports = {registerUser, loginUser};
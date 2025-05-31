const express = require('express');
const router = express.Router();
// const registerUser = require('../controllers/auth_controller');
// const loginUser = require('../controllers/auth_controller');
const { registerUser, loginUser } = require('../controllers/auth_controller');
const { authenticateMiddleware } = require('../middleware/auth_middleware');

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/check-auth',authenticateMiddleware, (req,res) => {

    const user = req.user;

    return res.status(200).json({
        success : true,
        message: 'authenticated user',
        data:{
            user
        }
    })
})

module.exports = router;
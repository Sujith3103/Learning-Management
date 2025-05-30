import jwt from 'jsonwebtoken';

const verifyToken = (token, secret) => {
    return jwt.verify(token,secret)
}

export const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.statur(401).json(
            { 
                success: false, 
                message: 'Authorization header is missing' 
            }
        )
    }

    const token = authHeader.split(' ')[1];

    const payload = verifyToken(token, process.env.JWT_SECRET);

    req.user = payload;

    next()

}
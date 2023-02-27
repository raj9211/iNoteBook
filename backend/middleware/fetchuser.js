const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Ajayisagoodb$oy';


const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to the req obj
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ message: "Authentication failed" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ message: "Authentication failed" });
    }

}




module.exports = fetchuser;
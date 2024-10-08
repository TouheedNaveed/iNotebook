const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const fetchuser = (req, res, next) => {
    //GET the user  from  jwt token and add id to req object

    const token = req.header('authToken');

    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        //verify token and send back data of the user
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });

    }

}

module.exports = fetchuser;
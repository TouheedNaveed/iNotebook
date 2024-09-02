const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = "Rajaisagoodb$oy";
//Route 1 creating user=> POST request with validation - create a user - No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be 6 charachters long').isLength({ min: 6 })
], async (req, res) => {

    //if errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Check if user already exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry user with this email already exixts!" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    }
    //catch errors if any
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occoured");
    }
});


//Route 2 Login => POST request with validation - authenticate a user -> login - No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    //if errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //request email and password from body which sent by user through login
    const { email, password } = req.body;

    try {
        //wether user exist or not
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Please try to login with correct credentials' });
        }
        //compare user password with database password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Please try to login with correct credentials' });
        }

        //sending payload or data of user
        const payload = {
            user: {
                id: user.id
            }
        };
        //Signing JWT secret and authtoken
        const authToken = jwt.sign(payload, JWT_SECRET);
        //request for authtoken
        res.json({ authToken });
    }
    //Catch error if any 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occoured");
    }

});


//Route 3 => GET logged user details using POST "/api/auth/getuser" - Login Required
//fetchuser is a middleware in separate folder which match the token and send back the user data
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        //user id fetched 
        const userId = req.user.id;
        //data will be matched through id and the password will not contain in data
        const user = await User.findById(userId).select("-password");
        res.send(user);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occoured");
    }
})
module.exports = router;
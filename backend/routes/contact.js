const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { body, validationResult } = require('express-validator');

router.post('/cdetails',[
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isLength({ min: 8 }),
    body('msg', 'Enter a valid Message').isLength({ min: 10 }),
], async (req, res) => {
    try {
        //requesting name,email and message from body which user enter
        const { name, email, msg } = req.body;
        //if errors return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });

        }
        const contact = new Contact({
            name:req.body.name,
            email: req.body.email,
            msg:req.body.msg
        })
        //saving note
        const saveContact = await contact.save()
        //sending response
        res.json(saveContact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occoured");
    }
});

module.exports=router;

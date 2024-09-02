const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route 1 => GET all the notes GET "/api/auth/fetchallnotes" - Login Required
//Fetch all notes of a specific user with his user id
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occoured");
    }
});

//Route 2 => Insert a new notes using  POST "/api/auth/addnote" - Login Required
//adding new note of specific user with his id
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        //requesting title,desc,and tag from body which user enter
        const { title, description, tag } = req.body;
        //if errors return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        //saving note
        const saveNote = await note.save()
        //sending response
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occoured");
    }
});

//Route 3 => Update an existing notes using  POST "/api/auth/updatenote" - Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Create a new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (title) { newNote.description = description };
        if (title) { newNote.tag = tag };

        //Find the note to updated and update it

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }

        //Allow updation only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("User Unauthorized")

        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occoured");
    }
});


//Route 4 => Delete an existing note using  DELETE "/api/auth/deletenote" - Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to deleted and delete it

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }

        //Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("User Unauthorized")

        }

        note = await Note.findByIdAndDelete(req.params.id);

        res.json({ "Sucess": "note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occoured");
    }
});
module.exports = router;
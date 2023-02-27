const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");


//ROUTE 1: Get All Notes using: Get "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ userId: req.user.id });
        res.json(notes);
    } catch (error) {
        const errObj = new Error(error);
        return res.status(500).send({
            success: false,
            message: errObj.message
        });
    }
});

//ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post("/addnote", fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const body = req.body;

        // if there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = await Notes.create({
            userId: req.user.id,
            title: body.title,
            description: body.description,
            tag: body.tag
        });

        res.json({ note });
    } catch (error) {
        const errObj = new Error(error);
        return res.status(500).send({
            success: false,
            message: errObj.message
        });
    }
});


//ROUTE 3: Update an existing Note using: Put "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Create a new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }
        console.log("string id", note.userId)
        if (note.userId.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        const errObj = new Error(error);
        return res.status(500).send({
            success: false,
            message: errObj.message
        });
    }
})


//ROUTE 4: Delete an existing Note using: Delete "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Allow deletion only if user owns this note
        if (note.userId.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Note deleted successfully" });

    } catch (error) {
        const errObj = new Error(error);
        return res.status(500).send({
            success: false,
            message: errObj.message
        });
    }

})



module.exports = router;
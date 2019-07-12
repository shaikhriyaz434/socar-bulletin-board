const express = require('express');
const router = express.Router();
const noteController = require('./note.controller');
const { check, validationResult } = require('express-validator');
router.get('/', async (req, res) => {
    try {
        let notes = await noteController.getAllNotes();
        return res.json(notes);
    } catch (err) {
        return res.json(err);
    }

})

router.get('/:noteId', async (req, res) => {
    try {
        let notes = await noteController.getNotesDetails(req.params.noteId);
        return res.json(notes);
    } catch (err) {
        return res.json(err);
    }

})

router.post('/', [check('title').isString(), check('description').isString()], async (req, res) => {
    let errors = validationResult(req);
    console.log("is array empty:", errors.isEmpty());
    if (errors.isEmpty()) {
        try {
            let notes = await noteController.createNote(req.body)
            return res.json(notes);
        } catch (err) {
            return res.send(err);
        }
    } else {
        return res.status(422).json({ error: errors.array() });
    }


})

router.put('/:noteId', [check("noteId").isString()], async (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
        let payload = req.body;
        payload.id = req.params.noteId;
        try {
            let result = await noteController.updateNote(payload);
            return res.json(result);
        } catch (err) {
            return res.send(err);
        }
    } else {
        return res.status(422).json({ error: errors.array() });
    }

})

module.exports = router;

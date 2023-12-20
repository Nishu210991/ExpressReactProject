const express = require("express");
const router = express.Router();

const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

// Route:1 : get all notes using GET.. /api/auth/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route:2 : Add new  notes using post.. /api/auth/addnotes
router.post('/addnotes',fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter description").isLength({ min: 6 }),
  ],async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route:3 : Update notes using PUT.. /api/auth/updatenotes
router.put('/updatenotes/:id',fetchuser ,async (req, res) => {
    const{title, description, tag} = req.body;
    try{
    // Create a NewNote object
    const NewNote = {};
    if (title){NewNote.title= title};
    if (description){NewNote.description= description};
    if (tag){NewNote.tag= tag};

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note){res.status(400).send("Not Found")}

    if (note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set:NewNote}, {new:true})
    res.json(note)
    } catch (error){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }

  });


// Route:4 : Delete notes using Delete.. /api/auth/deletenote
router.delete('/deletenotes/:id',fetchuser ,async (req, res) => {
try{
    // Find the note to be delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note){res.status(400).send("Not Found")}

    // Allow deletion if user authorized
    if (note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Message": "Sucessfully Deleted", note:note})
}catch (error){
    res.status(401).send({error: "Please authenticate using a valid token"})

}

  });
module.exports = router;

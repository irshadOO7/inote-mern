const express = require('express');
const notes = express.Router();
const Notes = require('../models/Notes');
const fatchUser = require('../middlewere/fatchUser');
const { body, validationResult } = require('express-validator');
const { Router } = require('express');
const { findByIdAndUpdate } = require('../models/Notes');
// rout 1 for geting all notes 
notes.get('/fetchallnote', fatchUser, async(req, res)=>{
    try {
        const note = await Notes.find({user : req.user.id});
        res.json(note)
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

notes.get('/addnotes', fatchUser,[
    body('title','Enter a valid Title').isLength({ min: 3 }),
    body('description','Enter a valid description').isLength({ min: 5 }),
], async(req, res)=>{
    const {title,description,tag} = req.body;
    //if there are error return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
   const notes = new Notes({
    title,description,tag,user:req.user.id
   });
   const saveNotes = await notes.save();
    res.json(saveNotes)
  } catch(error){
    console.error(error.message);
    res.status(500).send("Some Error Occured");
    }
})

// route 3: Update the notes
notes.put('/updatenotes/:id',fatchUser, async (req, res) => {
  try {
    const {title , description , tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
  // find the note to be updated 
  
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    if(note.user.toString() !== req.user.id){return res.status(404).send("Not Allowed")}
    note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote},{new : true}); 
    res.status(200).send(note); 
  } catch(error){
    console.error(error.message);
    res.status(500).send("Some Error Occured");
    }
 
})

// route 4: Deleted the notes
notes.delete('/deletenote/:id',fatchUser, async (req, res) => {
  try {
    // find the note to be deleted 
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}
  if(note.user.toString() !== req.user.id){return res.status(404).send("Not Allowed")}
  note = await Notes.findByIdAndDelete(req.params.id);
  res.status(200).send(note);
  
  } catch(error){
    console.error(error.message);
    res.status(500).send("Some Error Occured");
    }
})

module.exports = notes;
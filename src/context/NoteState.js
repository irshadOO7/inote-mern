import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteSate = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setnotes] = useState(notesInitial);
  //  Get All notes
  const getNotes = async(title, description, tag) => {
    // to do api call
    const response = await fetch(`${host}/api/notes/fetchallnote`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json)  
  }

  //  add a note
  const addNote = async(title, description, tag) => {
    // to do api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title , description, tag}),
    })
    const note = await response.json();
    setnotes(notes.concat(note))
    
    
  }

  //  delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    })
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((notes) => notes._id !== id);
    setnotes(newNote)
  }

  //  edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title , description, tag})
    })
    const json = await response.json();
    console.log(json);
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if(element._id === id){
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setnotes(newNote);
  }
  
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteSate;
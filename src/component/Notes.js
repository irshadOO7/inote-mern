import React,{useContext} from 'react'
import NoteContext from '../context/NoteContext'
import NotesItem from './NotesItem';

function Notes() {
    const context = useContext(NoteContext);
    const {notes , setnotes } = context;
    return (
        <div className='row my-3'>
            <h1>Your Notes </h1>
            {notes.map((note) => {
                return <NotesItem key = {note.id} note={note} />
            })}
        </div>
    )
}

export default Notes

import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/NoteContext';

const NotesItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote} = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card" >
                <div className="card-body">
                    <div className="d-flex align-item-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert('Deleted Successfully', 'success');}}></i>
                    <i className="fa fa-pen-to-square mx-2" onClick={()=>updateNote(note)} ></i>
                    </div>
                    <p className="card-text"> {note.description}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default NotesItem

import React from 'react'

const NotesItem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card" >
                <div className="card-body">
                    <div className="d-flex align-item-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i class="fa fa-trash mx-2"></i>
                    <i class="fa fa-pen-to-square mx-2"></i>
                    </div>
                    <p className="card-text"> {note.description}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default NotesItem

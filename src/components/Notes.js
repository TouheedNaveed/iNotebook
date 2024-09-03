import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
    let navigate=useNavigate();
    const { showAlert } = props;
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const refClose = useRef(null);
    const handleClick = (e) => {
        if (note.etitle.trim() === "" || note.edescription.trim() === "" || note.etag.trim() === "") {
            props.showAlert("Field is empty", "danger");
            return;
        }
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note Updated Successfully.", "success");

    };
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes();
        }
        else{
            navigate('/login'); 
        }
    
        //eslint-disable-next-line
    }, [])


    return (
        <>
            <AddNote showAlert={showAlert} />
            {/* Edit note form */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="my-3">
                                    <label htmlFor="etitle" className="form-label">Add Title</label>
                                    <input
                                        type='text'
                                        name='etitle'
                                        value={note.etitle}
                                        onChange={onChange}
                                        className="form-control"
                                        id="etitle"
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="my-3">
                                    <label htmlFor="edescription" className="form-label">Add Description</label>
                                    <input
                                        type='text'
                                        name='edescription'
                                        value={note.edescription}
                                        onChange={onChange}
                                        className="form-control"
                                        id="edescription"
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="my-3">
                                    <label htmlFor="etag" className="form-label">Add Tag</label>
                                    <input
                                        type='text'
                                        name='etag'
                                        value={note.etag}
                                        onChange={onChange}
                                        className="form-control"
                                        id="etag"
                                        required

                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length <= 5 || note.edescription.length < 5} type="button" className="btn btn-warning" onClick={handleClick} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Notes displayed cards */}
            <div className="row " style={{ marginBottom: "100px" }}>
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'No notes to Display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} editNote={updateNote} showAlert={showAlert} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes

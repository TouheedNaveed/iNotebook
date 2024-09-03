import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const addingNote = (e) => {
        e.preventDefault();
        if (note.title.trim() === "" || note.description.trim() === "" || note.tag.trim() === "") {
            props.showAlert("Please fill in all fields before adding the note.","danger");
            return;
        }

        addNote(note.title, note.description, note.tag);
        props.showAlert("Note Added Successfully.","success");
        setNote({ title: "", description: "", tag: "" });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className="container bg-light rounded shadow p-5" style={{marginBottom: "50px" }}>
                <h2>Add a Note</h2>
                <form>
                    <div className="my-3">
                        <label htmlFor="title" className="form-label">Add Title</label>
                        <input
                            type='text'
                            name='title'
                            value={note.title}
                            onChange={onChange}
                            className="form-control"
                            id="title"
                            minLength={5}
                            required
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="description" className="form-label">Add Description</label>
                        <input
                            type='text'
                            name='description'
                            value={note.description}
                            onChange={onChange}
                            className="form-control"
                            id="description"
                            minLength={5}
                            required
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="tag" className="form-label">Add Tag</label>
                        <input
                            type='text'
                            name='tag'
                            value={note.tag}
                            onChange={onChange}
                            className="form-control"
                            id="tag"
                            required

                        />
                    </div>
                    <div>
                        <input
                            onClick={addingNote}
                            className="btn btn-warning"
                            type="submit"
                            value="Add Note"
                            disabled={note.title.length<=5 || note.description.length<=5}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddNote;

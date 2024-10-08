import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {

    const { note, editNote } = props;
    const context = useContext(noteContext);
    const { delNote } = context;
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body bg-warning rounded shadow">
                    <h6 className="card-title"><strong>Title: </strong><span style={{fontWeight:'normal',fontSize:'18px'}}>{note.title}</span> </h6>
                    <p className="card-text"><strong>Description: </strong> <br /> {note.description}</p>
                    <p className="card-text"><strong>Tag: </strong>{note.tag}</p>
                    <div className="d-flex justify-content-end align-items-center gap-3">
                        <i className="fa-solid fa-pen-to-square" onClick={() => {
                            scrollToTop();
                            editNote(note);
                        }}>

                        </i>
                        <i className="fa-solid fa-trash" onClick={() => {
                            scrollToTop();
                            delNote(note._id);
                            props.showAlert("Note Deleted Successfully.", "success");
                        }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem

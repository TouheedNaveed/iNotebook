import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const notesInitial = [];
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState(notesInitial);
  //GET all note
  const getNotes = async () => {
    //API logic
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    //API logic
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note));

  }

  //Delete a note
  const delNote = async (id) => {
    //API logic
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);
    //Client side logic
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call logic
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json);
    //Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;

      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, delNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}
export default NoteState;
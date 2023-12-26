import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);


  //Fetch all Notes

   const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")    }
  
      });
      const json = await response.json()
      setNotes(json)
    }

  // Add a Note
    const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, 
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MmM2YTUxZjYwNDA1MTI2OTcyYTg4In0sImlhdCI6MTcwMzA3NzA0Nn0.q1J217y9NiYM2rqTh6uoZC_EaFOKili0W7wRcJcefl4",
        },
  
        body: JSON.stringify({title, description, tag}),
      });
    
    const note = await response.json()    
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async(id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, 
    {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")    
        }

      });
    const json = await response.json();
    console.log(json)
    const newNotes = notes.filter((note) => {
      return note.id !== id;
    });
    console.log(newNotes)
    setNotes(newNotes);
  };

  // Edit a Note
    const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")   
       },
      body: JSON.stringify({title, description, tag}),
      
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

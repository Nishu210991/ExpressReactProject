import React , {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext"

export default function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;

    const[note, setNote] = useState({title:"", description:"", tag:""})

    const handleOnClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
        props.showAlert("Added Notes Successfully", "success")

    }
    const onchange= (e)=>{
        setNote({...note, [e.target.name]:e.target.value})

    }
  return (
    <div className="container">
      <h2>Add your Notes</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text" onChange={onchange}
            className="form-control"  minLength={5} required
            id="title" name="title" value={note.title}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
          Description
          </label>
          <input
            type="text" onChange={onchange}
            className="form-control"  minLength={5} required
            id="description" name="description" value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
          Tag
          </label>
          <input
            type="text" onChange={onchange}
            className="form-control" value={note.tag}
            id="tag" name="tag"  minLength={5} required
          />
        </div>
       
        <button disabled={note.title.length<5 || note.description.length<5 }type="submit" className="btn btn-primary" onClick={handleOnClick}>
          Add Note
        </button>
      </form>
    </div>
  );
}

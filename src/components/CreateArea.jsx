import React, {useState} from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
    const [note,
        setNote] = useState({title: "", content: ""});
    const [isCLicked,
        setClick] = useState(false);

    function handleChange(event) {
        const {name, value} = event.target;

        setNote((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    }
    function addNote(event) {
        if (note.title !== "") {
            props.onAdd(note);
        }
        setNote({title: "", content: ""});
        event.preventDefault();
    }
    function handleClick() {
        setClick(true);
    }
    return (
        <div>
            <form className="create-note">
                {isCLicked
                    ? <input
                            onChange={handleChange}
                            value={note.title}
                            name="title"
                            placeholder="Title"/>
                    : null}
                <textarea
                    onChange={handleChange}
                    onClick={handleClick}
                    value={note.content}
                    name="content"
                    placeholder="Take a note..."
                    rows={isCLicked
                    ? 3
                    : 1}/>
                <Zoom  in={isCLicked}>
                    <Fab onClick={addNote}><AddCircleOutlineIcon/></Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;

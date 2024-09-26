import {useState, useEffect} from "react";
import "./EditableTitle.css";

export default function EditableTitle({initialTitle, onTitleChange}) {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

    useEffect(() =>{
        setTitle(initialTitle);
    }, [initialTitle]);

    const handleBlur = ()=>{
        setIsEditing(false);
        onTitleChange(title);
    }

    const handleChange =(e)=>{
        setTitle(e.target.value);
    }

    return (
        <>
            {isEditing ? (
                <input
                className="project-title-input"
                type="text"
                value={title}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                />
                ):(
                <h3 onClick={() => setIsEditing(true)} className="project-title">
                    {title}
                </h3>
            )}
        </>
    )

}
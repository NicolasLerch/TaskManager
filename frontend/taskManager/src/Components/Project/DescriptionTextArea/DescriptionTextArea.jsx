import { useState, useEffect } from "react";

export default function DescriptionTextArea({ initialDescription, onDescriptionChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  const handleBlur = () => {
    setIsEditing(false);
    onDescriptionChange(description);
  }

  return (
    <div>
      {isEditing ? (
        <textarea
          className="project-description-textarea"
          name="projectDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <p onClick={() => setIsEditing(true)} className="project-description">
          {description} {/* Mostrar la descripción actual */}
        </p>
      )}
    </div>
  );
}

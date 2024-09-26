import { useState } from "react";

function EditableTaskItem({ task, projectId,onTaskUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.name);

  const handleBlur = () => {
    setIsEditing(false);
    if (taskName !== task.name) {
      // Hacer PUT request al backend para actualizar la tarea
      fetch(`http://localhost:8080/api/tasks/${projectId}/${task.id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: taskName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Task updated:", data);
          onTaskUpdate({ ...task, name: taskName });
        })
        .catch((error) => {
          console.error("Error updating task:", error);
        });
    }
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <p onClick={() => setIsEditing(true)}>{task.name}</p>
      )}
      {/* Puedes agregar más campos como status, etc. */}
    </div>
  );
}

export default EditableTaskItem;

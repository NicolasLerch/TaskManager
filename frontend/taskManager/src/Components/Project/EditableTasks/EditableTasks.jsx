import { useState, useEffect } from "react";
import EditableTaskItem from "./EditableTaskItem";

export default function EditableTasks({ initalTaskItems, projectId, onTasksItemChange }) {
  const [tasksItems, setTasksItems] = useState([]);

  useEffect(() => {
    setTasksItems(initalTaskItems);
  }, [initalTaskItems]);

  const handleTaskUpdate = (updatedTask) => {
    // Actualiza el estado con la tarea modificada
    const updatedTasks = tasksItems.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasksItems(updatedTasks);
    onTasksItemChange(updatedTasks);
  };

  return (
    <div className="editable-tasks">
      {tasksItems.map((taskItem) => (
        <EditableTaskItem
          key={taskItem.id}
          task={taskItem}
          projectId={projectId}
          onTaskUpdate={handleTaskUpdate}
        />
      ))}
    </div>
  );
}

import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DescriptionTextArea from "./DescriptionTextArea/DescriptionTextArea";
import EditableTitle from "./EditableTitle/EditableTitle";
import EditableTasks from "./EditableTasks/EditableTasks";
// import "./Project.css";

export default function Project() {

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "/login/";
  }

  const [project, setProject] = useState("");
  const { projectId } = useParams();
  const url = `http://localhost:8080/api/projects/${projectId}`;
  // const [title, setTitle] = useState(project.name);
 

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProject(data.projectToEdit);
        // setTitle(data.projectToEdit.name);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }, [projectId]);
 

  // Esta función actualizará la descripción en el estado del proyecto
  const handleDescriptionChange = (newDescription) => {
    setProject((prevProject) => ({
      ...prevProject,
      description: newDescription,
    }));
  };

  const handleTitleChange = (newTitle) => {
    setProject((prevProject) => ({
      ...prevProject,
      name: newTitle,
    }));
  };

  const handleTasksChange = (updatedTasks) => {
    setProject((prevProject) => ({
      ...prevProject,
      tasks: updatedTasks,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/projects/edit/${projectId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            description: project.description,
            name: project.name
        }),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return alert("Project updated");
    })
  }

  const handleTasksSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/${projectId}/edit/${taskItem.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tasks: project.tasks
        }),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return alert("Tasks updated");
    })
  }

  return (
    <div className="project-container">
      <h3>
        {project ? (
          <div className="project-project-container">
            <EditableTitle initialTitle={project.name} onTitleChange={handleTitleChange}/>
            <div>
            <p className="date-info">Created at: {project.created_at}</p>
            <p className="date-info">Deadline: {project.finish_date}</p>
            </div>
            <DescriptionTextArea initialDescription={project.description} onDescriptionChange={handleDescriptionChange} />

            <h3>Tasks:</h3>
            <EditableTasks initalTaskItems={project.tasks} projectId={projectId} onTasksItemChange={handleTasksChange}/>
          </div>
        ) : (
          "Project not found"
        )}
      </h3>
      <button type="submit" onClick={handleSubmit}>Guardar cambios</button>
    </div>
  );
}

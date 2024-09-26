import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import "./Project.css";


export default function Project() {

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "/login/";
    }

    const [project, setProject] = useState("");

    const { projectId } = useParams();
    const url = `http://localhost:8080/api/projects/${projectId}`;

    useEffect(() => {
        fetch(url,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProject(data.projectToEdit);
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
    }, [projectId]);

    return (
        <div className="project-container">
            <h3>
                {project ? (
                    <div className="project-project-container">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <p>Created at: {project.created_at}</p>
                        <p>Deadline: {project.finish_date}</p>
                        <h3>Tasks:</h3>
                        <div className="project-tasks-container">
                            {project.tasks.map((task) => (
                                <li key={`task-${task.id}`}>{task.name}({task.status})</li>
                            ))}

                        </div>

                    </div>
                    ): "Project not found"}
            </h3>          
        
        </div>
    )


}
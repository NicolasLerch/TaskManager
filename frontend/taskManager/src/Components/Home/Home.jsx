import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "./Home.css"
import Project from "../Project/Project.jsx"

export default function Home() {

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        console.log(user);
        
        window.location.href = "/login";
    }

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/projects/?user_id=${user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setProjects(data.projects);
            })
            .catch((error) => {
                console.error("Error en la solicitud:", error);
            });
    }, []);

    return (
        <div className="home-container">
            <div className="home-header">
                <div className="home-welcome-container">
                    <h1>Home</h1>
                    <h2>Welcome {user.name}</h2>
                    <Link to="/login">Logout</Link>
                </div>
            </div>
            <div className="home-main-projects-container">
                <div className="home-projects-container">
                    <h3>Projects</h3>
                        {projects.map((project, index) => (
                            <ul className="home-projects-list" key={`list-${index}`}>
                                <div className="home-project" key={index}>
                                    <li key={index}><Link to={`/home/project/${project.id}`}>{project.name}</Link></li>
                                </div>
                            </ul>   
                        ))}
                    <Link to="/project/new" className="link-text"><button className="home-create-project-button">Create new project</button></Link>
                </div>
                <Project />
            </div>

            
        </div>
    )
}
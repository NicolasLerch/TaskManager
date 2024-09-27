import { useEffect, useState } from "react";
import "./NewProjectForm.css";
// import { useHref } from "react-router-dom";

export default function NewProjectForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [created_at, setCreated_at] = useState(
        new Date().toISOString().slice(0, 10)
    ); // Fecha de hoy
    const [finish_date, setFinish_date] = useState(""); // Vacío al principio
    const [creator, setCreator] = useState(null); // Puedes pasar el userId o algo similar

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user.id);
        
        if (user) {
            setCreator(user); // Asegúrate de que `user` contiene un `id` válido
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();       
        
        fetch("http://localhost:8080/api/projects/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
                created_at,
                finish_date,
                creator:creator.id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert("Proyecto creado");
                 window.location.href = `/home`
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                alert("Error al crear el proyecto")});
    };

    return (
        <div className="new-project-form">
            <h1 style={{ color: "black" }}>NUEVO PROYECTO</h1>
            <form className="new-project-form" onSubmit={handleSubmit}>
                {/* Campo de Nombre del Proyecto */}
                <div>
                    <label htmlFor="title">Nombre del Proyecto:</label>
                    <input
                        type="text"
                        id="title"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setName(name.trim())} // Elimina espacios adicionales
                        required
                    />
                </div>

                {/* Campo de Descripción */}
                <div>
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={() => setDescription(description.trim())} // Elimina espacios adicionales
                        required
                    />
                </div>

                {/* Campo de Fecha de Creación */}
                <div>
                    <label htmlFor="createdAt">Fecha de Creación:</label>
                    <input
                        type="date"
                        id="createdAt"
                        name="created_at"
                        value={created_at}
                        onChange={(e) => setCreated_at(e.target.value)}
                        required
                    />
                </div>

                {/* Campo de Fecha de Finalización */}
                <div>
                    <label htmlFor="finishDate">Fecha de Finalización:</label>
                    <input
                        type="date"
                        id="finishDate"
                        name="finish_date"
                        value={finish_date}
                        onChange={(e) => setFinish_date(e.target.value)}
                        required
                    />
                </div>

                {/* Botón para enviar el formulario */}
                <button type="submit">Crear Proyecto</button>
            </form>
        </div>
    );
}

import { useState, useEffect } from "react";
import "./LoginForm.css";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("email: ", email);
        console.log("password: ", password);
        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    window.location.href = "/home";
                    setUser(data.user)
                    localStorage.setItem("user", JSON.stringify(data.user));
                    console.log(user);
                    
                } else {
                    alert(data.msg);
                }
            })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
        
    };
    

    return (
        <div className="login-form-container">
            <h1>TASK MANAGER</h1>
            <form className="login-form">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="login-button" type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setToken }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/auth/token",
                new URLSearchParams({
                    username: form.username,
                    password: form.password,
                })
            );
            setToken(res.data.access_token);
            localStorage.setItem("token", res.data.access_token);
            navigate("/admin/productos"); // Redirige a la página de admin después del login
        } catch {
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
            <input
                name="username"
                placeholder="Usuario"
                value={form.username}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
            />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="border p-2 mb-4 w-full"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
                Iniciar sesión
            </button>
        </form>
    );
}

export default Login;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";
import Cart from "./Cart";
import Landing from "./Landing";
import Navbar from "./NavBar.jsx";
import MyOrders from "./MyOrders";
import CreateProduct from "./CreateProduct";
import ProductAdmin from "./ProductAdmin.jsx";
import Login from "./Login";

function App() {
  // Estado para el token
  const [token, setToken] = useState(null);

  // Al cargar la app, recuperamos token guardado en localStorage (si existe)
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      // Configuramos axios para enviar token automáticamente
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
  }, []);

  // Función para actualizar token (por ejemplo al hacer login)
  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  // Función para logout
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  // Componente para proteger rutas privadas
  const PrivateRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/productos" element={<Home />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/mis-pedidos" element={<MyOrders />} />
          <Route path="/crear-producto" element={<CreateProduct />} />
          <Route
            path="/admin/productos"
            element={
              <PrivateRoute>
                <ProductAdmin />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login setToken={handleSetToken} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

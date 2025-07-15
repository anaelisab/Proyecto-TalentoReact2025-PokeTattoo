"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ContextoAuth = createContext();

export const usarAuth = () => {
  const contexto = useContext(ContextoAuth);
  if (!contexto) {
    throw new Error("usarAuth debe ser usado dentro de un ProveedorAuth");
  }
  return contexto;
};

export const ProveedorAuth = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Verificar si hay usuario guardado al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioTatuajesPokemon");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const iniciarSesion = async (email, contraseña) => {
    try {
      // Simulación de login - en producción sería una API real
      if (email && contraseña) {
        const usuarioSimulado = {
          id: 1,
          nombre: "Usuario",
          email: email,
          rol: "cliente",
          fechaRegistro: new Date().toISOString(),
        };

        setUsuario(usuarioSimulado);
        localStorage.setItem(
          "usuarioTatuajesPokemon",
          JSON.stringify(usuarioSimulado)
        );
        return { exito: true, mensaje: "Sesión iniciada correctamente" };
      } else {
        return { exito: false, mensaje: "Email y contraseña son requeridos" };
      }
    } catch (error) {
      return { exito: false, mensaje: "Error al iniciar sesión" };
    }
  };

  const registrarse = async (nombre, email, contraseña) => {
    try {
      // Simulación de registro
      if (nombre && email && contraseña) {
        const nuevoUsuario = {
          id: Date.now(),
          nombre: nombre,
          email: email,
          rol: "cliente",
          fechaRegistro: new Date().toISOString(),
        };

        setUsuario(nuevoUsuario);
        localStorage.setItem(
          "usuarioTatuajesPokemon",
          JSON.stringify(nuevoUsuario)
        );
        return { exito: true, mensaje: "Cuenta creada correctamente" };
      } else {
        return { exito: false, mensaje: "Todos los campos son requeridos" };
      }
    } catch (error) {
      return { exito: false, mensaje: "Error al crear la cuenta" };
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuarioTatuajesPokemon");
  };

  const estaAutenticado = () => {
    return usuario !== null;
  };

  const valor = {
    usuario,
    cargando,
    iniciarSesion,
    registrarse,
    cerrarSesion,
    estaAutenticado,
  };

  return (
    <ContextoAuth.Provider value={valor}>{children}</ContextoAuth.Provider>
  );
};

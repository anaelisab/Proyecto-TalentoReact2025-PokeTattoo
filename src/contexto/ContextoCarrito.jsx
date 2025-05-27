"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ContextoCarrito = createContext();

export const usarCarrito = () => {
  const contexto = useContext(ContextoCarrito);
  if (!contexto) {
    throw new Error("usarCarrito debe ser usado dentro de un ProveedorCarrito");
  }
  return contexto;
};

export const ProveedorCarrito = ({ children }) => {
  const [elementosCarrito, setElementosCarrito] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carritoTatuajesPokemon");
    if (carritoGuardado) {
      setElementosCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem(
      "carritoTatuajesPokemon",
      JSON.stringify(elementosCarrito)
    );
  }, [elementosCarrito]);

  const agregarAlCarrito = (pokemon, opciones) => {
    // Buscar si ya existe un producto con las mismas características
    const elementoExistente = elementosCarrito.find(
      (elemento) =>
        elemento.pokemon.id === pokemon.id &&
        elemento.opciones.tamaño === opciones.tamaño &&
        elemento.opciones.color === opciones.color &&
        elemento.opciones.ubicacion === opciones.ubicacion
    );

    if (elementoExistente) {
      // Si existe, incrementar la cantidad
      actualizarCantidad(elementoExistente.id, elementoExistente.cantidad + 1);
    } else {
      // Si no existe, crear nuevo elemento
      const nuevoElemento = {
        id: `${pokemon.id}-${Date.now()}`,
        pokemon,
        opciones,
        cantidad: 1,
        precio: calcularPrecio(opciones),
      };
      setElementosCarrito((prev) => [...prev, nuevoElemento]);
    }
  };

  const eliminarDelCarrito = (idElemento) => {
    setElementosCarrito((prev) =>
      prev.filter((elemento) => elemento.id !== idElemento)
    );
  };

  const actualizarCantidad = (idElemento, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(idElemento);
      return;
    }

    setElementosCarrito((prev) =>
      prev.map((elemento) =>
        elemento.id === idElemento
          ? { ...elemento, cantidad: nuevaCantidad }
          : elemento
      )
    );
  };

  const calcularPrecio = (opciones) => {
    let precioBase = 15000;

    // Precio por tamaño
    switch (opciones.tamaño) {
      case "5cm":
        precioBase += 5000;
        break;
      case "10cm":
        precioBase += 10000;
        break;
      case "15cm":
        precioBase += 15000;
        break;
    }

    // Precio por color
    if (opciones.color === "color") {
      precioBase += 5000;
    }

    return precioBase;
  };

  const obtenerPrecioTotal = () => {
    return elementosCarrito.reduce(
      (total, elemento) => total + elemento.precio * elemento.cantidad,
      0
    );
  };

  const obtenerTotalElementos = () => {
    return elementosCarrito.reduce(
      (total, elemento) => total + elemento.cantidad,
      0
    );
  };

  const vaciarCarrito = () => {
    setElementosCarrito([]);
  };

  const valor = {
    elementosCarrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    obtenerPrecioTotal,
    obtenerTotalElementos,
    vaciarCarrito,
    calcularPrecio,
  };

  return (
    <ContextoCarrito.Provider value={valor}>
      {children}
    </ContextoCarrito.Provider>
  );
};

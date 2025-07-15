"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { productosAPI } from "../servicios/mockapi";
import { toast } from "react-toastify";

const ContextoProductos = createContext();

export const usarProductos = () => {
  const contexto = useContext(ContextoProductos);
  if (!contexto) {
    throw new Error(
      "usarProductos debe ser usado dentro de un ProveedorProductos"
    );
  }
  return contexto;
};

export const ProveedorProductos = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const productosObtenidos = await productosAPI.obtenerTodos();
      setProductos(productosObtenidos);

      // Solo mostrar mensaje si realmente hay productos
      if (productosObtenidos.length === 0) {
        console.info("No hay productos en la API, iniciando con lista vacía");
      }
    } catch (error) {
      setError(error.message);
      // No mostrar toast de error al cargar inicialmente
      console.error("Error al cargar productos:", error.message);
    } finally {
      setCargando(false);
    }
  };

  const agregarProducto = async (nuevoProducto) => {
    try {
      const productoCreado = await productosAPI.crear(nuevoProducto);
      setProductos((prev) => [...prev, productoCreado]);
      toast.success("Producto agregado correctamente");
      return { exito: true, producto: productoCreado };
    } catch (error) {
      toast.error("Error al agregar producto: " + error.message);
      return { exito: false, error: error.message };
    }
  };

  const actualizarProducto = async (id, datosActualizados) => {
    try {
      const productoActualizado = await productosAPI.actualizar(
        id,
        datosActualizados
      );
      setProductos((prev) =>
        prev.map((producto) =>
          producto.id === id ? productoActualizado : producto
        )
      );
      toast.success("Producto actualizado correctamente");
      return { exito: true, producto: productoActualizado };
    } catch (error) {
      toast.error("Error al actualizar producto: " + error.message);
      return { exito: false, error: error.message };
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await productosAPI.eliminar(id);
      setProductos((prev) => prev.filter((producto) => producto.id !== id));
      toast.success("Producto eliminado correctamente");
      return { exito: true };
    } catch (error) {
      toast.error("Error al eliminar producto: " + error.message);
      return { exito: false, error: error.message };
    }
  };

  const obtenerProductoPorId = async (id) => {
    try {
      const producto = await productosAPI.obtenerPorId(id);
      return { exito: true, producto };
    } catch (error) {
      return { exito: false, error: error.message };
    }
  };

  const valor = {
    productos,
    cargando,
    error,
    cargarProductos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerProductoPorId,
  };

  return (
    <ContextoProductos.Provider value={valor}>
      {children}
    </ContextoProductos.Provider>
  );
};

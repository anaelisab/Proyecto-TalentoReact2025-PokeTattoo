import axios from "axios";
// Mock API para productos personalizados
// URL base de la API mock
const API_BASE_URL = "https://6876a0ca814c0dfa653cbba0.mockapi.io/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en API:", error);
    return Promise.reject(error);
  }
);

// Servicios para productos personalizados
export const productosAPI = {
  // Obtener todos los productos
  obtenerTodos: async () => {
    try {
      const response = await api.get("/productos");
      return response.data;
    } catch (error) {
      // Si falla la API, devolver array vacío en lugar de error
      console.warn("API no disponible, usando datos locales");
      return [];
    }
  },

  // Obtener producto por ID
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener producto: " + error.message);
    }
  },

  // Crear nuevo producto
  crear: async (producto) => {
    try {
      const response = await api.post("/productos", producto);
      return response.data;
    } catch (error) {
      // Simular creación local si falla la API
      console.warn("API no disponible, simulando creación");
      return {
        ...producto,
        id: Date.now().toString(),
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
      };
    }
  },

  // Actualizar producto
  actualizar: async (id, producto) => {
    try {
      const response = await api.put(`/productos/${id}`, producto);
      return response.data;
    } catch (error) {
      // Simular actualización local si falla la API
      console.warn("API no disponible, simulando actualización");
      return {
        ...producto,
        id: id,
        fechaActualizacion: new Date().toISOString(),
      };
    }
  },

  // Eliminar producto
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      // Simular eliminación local si falla la API
      console.warn("API no disponible, simulando eliminación");
      return { success: true };
    }
  },
};

export default api;

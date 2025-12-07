import axios from "axios";

// su tonta api paradefinir la estructura
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// esto se ejecuta siempre antes de cada request este intercepta las apis
api.interceptors.request.use(
  (config) => {
    // mas que na nos fijamos que exista el token y si existe lo chantamos al Header
    const token = localStorage.getItem("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// este se ejecuta despue que el server responda
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Acceder a la respuesta de error del servidor
    const response = error.response;

    if (response) {
      // 🚨 SOLUCIÓN PARCHE: Detectar si el servidor devolvió HTML (5xx o 401/403 no manejado)

      // 1. Obtener el Content-Type
      const contentType =
        response.headers["content-type"] || response.headers["Content-Type"];

      // 2. Si el Content-Type es HTML (lo que causa el error 'Unexpected token <')
      if (contentType && contentType.includes("text/html")) {
        console.warn("Backend devolvió HTML en un error. Forzando logout.");

        // Tratar como un error de autenticación (401/403 no manejado)
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        window.location.href = "/inicio-sesion";

        // Devolver una nueva Promesa de error o simplemente no devolver nada para evitar el parseo.
        return Promise.reject(
          new Error("Error de servidor: Se recibió HTML en lugar de JSON.")
        );
      }

      // 3. Si es JSON (o cualquier otro formato), se deja que el error se propague.
      if (response.status === 401) {
        // ... (Tu lógica de logout y redirección existente para el 401) ...
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        window.location.href = "/inicio-sesion";
      }
    }

    return Promise.reject(error);
  }
);

export default api;

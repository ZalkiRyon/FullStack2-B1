import api from "../config/axiosConfig";

// POST / CREATE: user
export const createUser = async (user) => {
  try {
    const response = await api.post("/usuarios", user);

    if (response.status == 201) {
      console.log(`Usuario ${user} creado con exito`);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.error(`Error al crear usuario:`, error.response.data);
      throw new Error(`Fallo en la creación: ${error.response.data.message}`);
    }
    console.error("Error en createUser:", error.message);
    throw error;
  }
};

// GET / READ: users
export const getAllUsers = async () => {
  try {
    const response = await api.get("/usuarios");

    if (response.status == 200) {
      return response.data;
    }
    
  } catch (error) {
    console.error("Error en getAllUsers:", error);
    return [];
  }
};

// DELETE / DELETE: user
export const deleteUserById = async (userId) => {
  const url = `/usuarios/${userId}`;
  try {
    const response = await api.delete(url);

    if (response.status == 204) {
      console.log(`Usuario ${userId} eliminado con exito`);
      return true;
    }
    return true;
  } catch (error) {
    console.error("Error en deleteUserById:", error);
    throw error;
  }
};

// PUT / UPDATE: user
export const updateUserById = async (userId, user) => {
  const url = `/usuarios/${userId}`;

  try {
    const response = await api.put(url, user);

    if (response.status == 200) {
      console.log(`Usuario ${userId} actualizadop con exito`);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Error 404, usuario ${userId} no existe`);
      return null;
    }

    console.error("Error en updateUserById:", error);
    throw error;
  }
};

// FUNCIOENS ESPECIALES
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/usuarios/${userId}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.error(`Error 404: Usuario ${userId} no existe.`);
        return null;
      }
      console.error(
        `Error ${error.response.status} al obtener usuario:`,
        error.response.data
      );
    }
    throw error;
  }
};

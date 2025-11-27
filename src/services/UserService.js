import axios from "axios";

const API_BASE = "http://localhost:8080/api/usuarios";

// POST / CREATE: user
export const createUser = async (user) => {
  try {
    const response = await axios.post(API_BASE, user);

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
    const response = await axios.get(API_BASE);

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
  const url = `${API_BASE}/${userId}`;
  try {
    const response = await axios.delete(url);

    if (response.status == 204) {
      console.log(`Usuario ${userId} eliminado con exito`);
      return true;
    }
  } catch (error) {
    console.error("Error en deleteUserById:", error);
    throw error;
  }
};

// PUT / UPDATE: user
export const updateUserById = async (userId, user) => {
  const url = `${API_BASE}/${userId}`;

  try {
    const response = await axios.put(url, user);

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

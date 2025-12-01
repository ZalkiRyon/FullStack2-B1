import api from "../config/axiosConfig";

// GET / READ: roles
export const getAllRoles = async () => {
  try {
    const response = await api.get("/roles");

    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error en getAllRoles:", error);
    return [];
  }
};

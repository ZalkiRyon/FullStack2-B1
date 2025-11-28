import axios from "axios";

const API_BASE = "http://localhost:8080/api/roles";

// GET / READ: roles
export const getAllRoles= async () => {
  try {
    const response = await axios.get(API_BASE);

    if (response.status == 200) {
      return response.data;
    }
    
  } catch (error) {
    console.error("Error en getAllRoles:", error);
    return [];
  }
};
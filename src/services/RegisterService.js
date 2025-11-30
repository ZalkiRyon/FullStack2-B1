import api from "../config/axiosConfig";

const base = "/public/register";

export const validateEmail = async (email) => {
  const url = `${base}/validate-email`;
  try {
    const response = await api.post(url, {
      email,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error en validateEmail", error);
    throw error;
  }
};

export const createUserRegister = async (user) => {
  const url = `${base}/create-user`;
     console.log("user", user);
  try {
    const response = await api.post(url, 
      user
    );
    console.log("user", user);
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("error en create register", error);
      const errorMessage =
        error.response.data.message ||
        `Error ${error.response.status} desconocido.`;
      throw new Error(errorMessage);
    }
    throw error;
  }
};

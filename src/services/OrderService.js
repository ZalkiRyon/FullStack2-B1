import api from "../config/axiosConfig";

// POST / CREATE: orden
export const createOrder = async (order) => {
  try {
    const response = await api.post("/ordenes", order);

    if (response.status === 201) {
      console.log(`Orden creada con éxito:`, response.data);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.error(`Error al crear orden:`, error.response.data);
      throw new Error(
        `Fallo en la creación: ${
          error.response.data.message || "Error desconocido"
        }`
      );
    }
    console.error("Error en createOrder:", error.message);
    throw error;
  }
};

// GET / READ: orders
export const getAllOrders = async () => {
  try {
    const response = await api.get("/ordenes");

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error en getAllOrders:", error);
    return [];
  }
};

// GET / READ: order by id
export const getOrderById = async (orderId) => {
  const url = `/ordenes/${orderId}`;
  try {
    const response = await api.get(url);

    if (response.status === 200) {
      console.log(`Orden ${orderId} obtenida con éxito`);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Error 404, orden ${orderId} no existe`);
      return null;
    }

    console.error("Error en getOrderById:", error);
    throw error;
  }
};

// DELETE / DELETE: order
export const deleteOrderById = async (orderId) => {
  const url = `/ordenes/${orderId}`;
  try {
    const response = await api.delete(url);

    if (response.status === 204) {
      console.log(`Orden ${orderId} eliminada con éxito`);
      return true;
    }
    return true;
  } catch (error) {
    console.error("Error en deleteOrderById:", error);
    throw error;
  }
};

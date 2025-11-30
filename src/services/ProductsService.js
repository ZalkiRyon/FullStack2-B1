import api from "../config/axiosConfig";

// POST / CREATE: product
export const createProduct = async (product) => {
  try {
    const response = await api.post("/productos", product);

    if (response.status == 201) {
      console.log(`Producto ${product} creado con exito`);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error.response) {
      console.error(`Error al crear product:`, error.response.data);
      throw new Error(`Fallo en la creación: ${error.response.data.message}`);
    }
    console.error("Error en createProduct:", error.message);
    throw error;
  }
};

// GET / READ: products
export const getAllProducts = async () => {
  try {
    const response = await api.get("/productos");

    if (response.status == 200) {
      return response.data;
    } else {
      console.error(`Error HTTP estado en getAllProducts: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    return [];
  }
};

// DELETE / DELETE: product
export const deleteProductById = async (productId) => {
  const url = `/productos/${productId}`;
  try {
    const response = await api.delete(url);

    if (response.status == 204) {
      console.log(`Producto con id ${productId} eliminado con exito`);
      return true;
    } else {
      console.error(`Error 404: El producto de id ${productId} no existe`);
      return false;
    }
  } catch (error) {
    console.error("Error en deleteProductById:", error);
    throw error;
  }
};

// PUT / UPDATE: product
export const updateProductById = async (productId, product) => {
  const url = `/productos/${productId}`;

  try {
    const response = await api.put(url, product);

    if (response.status == 200) {
      console.log(`Producto con id ${productId} actualizadop con exito`);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Error 404, El producto con id ${productId} no existe`);
      return null;
    }

    console.error("Error en updateProductById:", error);
    throw error;
  }
};

// FUNCTIONS SPECIALS products
export const getProductNameById = async (productId) => {
  const url = `/productos/${productId}/nombre`;
  try {
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Error: Producto de id ${productId} no encontrado`);
      return null;
    }
    console.error("Error en getProductNameById:", error);
    return null;
  }
};

export const getProductById = async (productId) => {
  const url = `/productos/${productId}`;
  try {
    const response = await api.get(url);

    const product = await response.data;

    return product;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.error(`Error 404: Producto de id ${productId} no encontrado`);
        return null;
      }
      console.error(
        `Error ${error.response.status} al obtener producto:`,
        error.response.data
      );
    }

    console.error("Error en getProductById:", error);

    throw error;
  }
};

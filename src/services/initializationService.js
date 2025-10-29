import { usuarios } from "../utils/dataUsuarios";
import { listaProductos } from "../utils/dataProductos";
import { ordenes } from "../utils/dataOrdenes";
import { repairOrdenesInStorage } from "../utils/repairOrdenes";

/**
 * Servicio centralizado para inicializar todos los datos de la aplicación 
 */

/**
 * Inicializa los usuarios en localStorage si no existen
 */
const initializeUsuarios = () => {
  if (!localStorage.getItem("ListaUsuarios")) {
    console.log("Inicializando usuarios en localStorage...");
    localStorage.setItem("ListaUsuarios", JSON.stringify(usuarios));
  }
};

/**
 * Inicializa los productos en localStorage si no existen
 */
const initializeProductos = () => {
  if (!localStorage.getItem("ListaProductos")) {
    console.log("Inicializando productos en localStorage...");
    localStorage.setItem("ListaProductos", JSON.stringify(listaProductos));
  }
};

/**
 * Inicializa las órdenes en localStorage si no existen
 */
const initializeOrdenes = () => {
  if (!localStorage.getItem("ListaOrdenes")) {
    console.log("Inicializando órdenes en localStorage...");
    localStorage.setItem("ListaOrdenes", JSON.stringify(ordenes));
  }
};

/**
 * Función principal que inicializa toda la aplicación
 */
export const initializeApp = () => {
  initializeUsuarios();
  initializeProductos();
  initializeOrdenes();
  
  // Reparar órdenes existentes que puedan tener subtotales incorrectos
  repairOrdenesInStorage();
};

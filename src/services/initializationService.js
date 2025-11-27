
import { ordenes } from "../utils/dataOrdenes";
import { repairOrdenesInStorage } from "../utils/repairOrdenes";

/**
 * Servicio centralizado para inicializar todos los datos de la aplicación 
 */

/**
 * Inicializa los usuarios en localStorage si no existen
 */


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
  initializeOrdenes();
  // Reparar órdenes existentes que puedan tener subtotales incorrectos
  repairOrdenesInStorage();
};

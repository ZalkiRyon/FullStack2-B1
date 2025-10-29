/**
 * Función de utilidad para reparar órdenes en localStorage
 * que tienen subtotales NaN o incorrectos
 */
export const repairOrdenesInStorage = () => {
  try {
    const storedOrdenes = localStorage.getItem("ListaOrdenes");
    
    if (!storedOrdenes) {
      console.log("No hay órdenes en localStorage");
      return { success: false, message: "No hay órdenes para reparar" };
    }

    const ordenes = JSON.parse(storedOrdenes);
    let ordenesReparadas = 0;

    const ordenesActualizadas = ordenes.map((orden) => {
      // Recalcular subtotales de cada detalle
      const detallesReparados = orden.detalles.map((detalle) => {
        const precioUnitario = detalle.precio || detalle.precioUnitario || 0;
        const cantidad = detalle.cantidad || 0;
        const subtotalCalculado = precioUnitario * cantidad;

        // Si el subtotal es diferente o es NaN, repararlo
        if (detalle.subtotal !== subtotalCalculado || isNaN(detalle.subtotal)) {
          ordenesReparadas++;
          return {
            ...detalle,
            subtotal: subtotalCalculado,
          };
        }

        return detalle;
      });

      // Recalcular el monto total de la orden
      const montoCalculado = detallesReparados.reduce(
        (sum, detalle) => sum + (detalle.subtotal || 0),
        0
      );

      return {
        ...orden,
        detalles: detallesReparados,
        // Solo actualizar el monto si es diferente
        monto: orden.monto || montoCalculado,
      };
    });

    // Guardar las órdenes reparadas
    localStorage.setItem("ListaOrdenes", JSON.stringify(ordenesActualizadas));

    console.log(`✅ ${ordenesReparadas} detalles de órdenes reparados`);
    
    return {
      success: true,
      message: `${ordenesReparadas} detalles reparados`,
      ordenes: ordenesActualizadas,
    };
  } catch (error) {
    console.error("Error al reparar órdenes:", error);
    return { success: false, error: error.message };
  }
};

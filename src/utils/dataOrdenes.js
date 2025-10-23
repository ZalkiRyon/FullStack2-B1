export const ordenes = [
  {
    id: 1,
    fecha: "2024-06-01",
    numeroOrden: "SO1001",
    clienteId: 4,
    clienteNombre: "Ana María Martínez López",
    estado: "Enviado",
    monto: 21300,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 1,
        productoNombre: "FR001 - Manzanas Fuji",
        cantidad: 5,
        precioUnitario: 1200,
        subtotal: 6000,
      },
      {
        productoId: 7,
        productoNombre: "PO001 - Miel Organica",
        cantidad: 2,
        precioUnitario: 5000,
        subtotal: 10000,
      },
      {
        productoId: 5,
        productoNombre: "VR002 - Espinacas Frescas",
        cantidad: 3,
        precioUnitario: 700,
        subtotal: 2100,
      },
      {
        productoId: 3,
        productoNombre: "FR003 - Plátanos Cavendish",
        cantidad: 4,
        precioUnitario: 800,
        subtotal: 3200,
      },
    ],
  },
  {
    id: 2,
    fecha: "2024-06-02",
    numeroOrden: "SO1002",
    clienteId: 5,
    clienteNombre: "Pedro Antonio Ramírez Castro",
    estado: "Pendiente",
    monto: 14500,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 2,
        productoNombre: "FR002 - Naranjas Valencia",
        cantidad: 10,
        precioUnitario: 1000,
        subtotal: 10000,
      },
      {
        productoId: 4,
        productoNombre: "VR001 - Zanahorias Organicas",
        cantidad: 5,
        precioUnitario: 900,
        subtotal: 4500,
      },
    ],
  },
  {
    id: 3,
    fecha: "2024-06-02",
    numeroOrden: "SO1003",
    clienteId: 6,
    clienteNombre: "Lucía Elena Fernández Morales",
    estado: "Cancelado",
    monto: 8000,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 3,
        productoNombre: "FR003 - Plátanos Cavendish",
        cantidad: 10,
        precioUnitario: 800,
        subtotal: 8000,
      },
    ],
  },
  {
    id: 4,
    fecha: "2024-06-03",
    numeroOrden: "SO1004",
    clienteId: 10,
    clienteNombre: "Juan Carlos Pérez Soto",
    estado: "Procesando",
    monto: 12000,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 6,
        productoNombre: "VR003 - Pimentones Tricolores",
        cantidad: 4,
        precioUnitario: 1500,
        subtotal: 6000,
      },
      {
        productoId: 8,
        productoNombre: "PO002 - Quinua Organica",
        cantidad: 2,
        precioUnitario: 3000,
        subtotal: 6000,
      },
    ],
  },
  {
    id: 5,
    fecha: "2024-06-04",
    numeroOrden: "SO1005",
    clienteId: 11,
    clienteNombre: "Carla Andrea López Muñoz",
    estado: "Enviado",
    monto: 16800,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 1,
        productoNombre: "FR001 - Manzanas Fuji",
        cantidad: 8,
        precioUnitario: 1200,
        subtotal: 9600,
      },
      {
        productoId: 9,
        productoNombre: "PL001 - Leche Entera",
        cantidad: 6,
        precioUnitario: 1200,
        subtotal: 7200,
      },
    ],
  },
  {
    id: 6,
    fecha: "2024-06-05",
    numeroOrden: "SO1006",
    clienteId: 12,
    clienteNombre: "Roberto Andrés Sánchez Vera",
    estado: "Pendiente",
    monto: 18500,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 7,
        productoNombre: "PO001 - Miel Organica",
        cantidad: 3,
        precioUnitario: 5000,
        subtotal: 15000,
      },
      {
        productoId: 5,
        productoNombre: "VR002 - Espinacas Frescas",
        cantidad: 5,
        precioUnitario: 700,
        subtotal: 3500,
      },
    ],
  },
  {
    id: 7,
    fecha: "2024-06-06",
    numeroOrden: "SO1007",
    clienteId: 13,
    clienteNombre: "María Cristina Silva Rojas",
    estado: "Enviado",
    monto: 16800,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 9,
        productoNombre: "PL001 - Leche Entera",
        cantidad: 10,
        precioUnitario: 1200,
        subtotal: 12000,
      },
      {
        productoId: 3,
        productoNombre: "FR003 - Plátanos Cavendish",
        cantidad: 6,
        precioUnitario: 800,
        subtotal: 4800,
      },
    ],
  },
  {
    id: 8,
    fecha: "2024-06-07",
    numeroOrden: "SO1008",
    clienteId: 14,
    clienteNombre: "Diego Sebastián Morales Castro",
    estado: "Procesando",
    monto: 28000,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 7,
        productoNombre: "PO001 - Miel Organica",
        cantidad: 4,
        precioUnitario: 5000,
        subtotal: 20000,
      },
      {
        productoId: 2,
        productoNombre: "FR002 - Naranjas Valencia",
        cantidad: 8,
        precioUnitario: 1000,
        subtotal: 8000,
      },
    ],
  },
  {
    id: 9,
    fecha: "2024-06-08",
    numeroOrden: "SO1009",
    clienteId: 15,
    clienteNombre: "Valentina Isabel Rojas Hernández",
    estado: "Cancelado",
    monto: 6000,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 1,
        productoNombre: "FR001 - Manzanas Fuji",
        cantidad: 5,
        precioUnitario: 1200,
        subtotal: 6000,
      },
    ],
  },
  {
    id: 10,
    fecha: "2024-06-09",
    numeroOrden: "SO1010",
    clienteId: 16,
    clienteNombre: "Francisco Javier Gómez Torres",
    estado: "Enviado",
    monto: 14700,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 8,
        productoNombre: "PO002 - Quinua Organica",
        cantidad: 4,
        precioUnitario: 3000,
        subtotal: 12000,
      },
      {
        productoId: 4,
        productoNombre: "VR001 - Zanahorias Organicas",
        cantidad: 3,
        precioUnitario: 900,
        subtotal: 2700,
      },
    ],
  },
  {
    id: 11,
    fecha: "2024-06-10",
    numeroOrden: "SO1011",
    clienteId: 17,
    clienteNombre: "Camila Fernanda Vargas Pérez",
    estado: "Pendiente",
    monto: 13800,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 6,
        productoNombre: "VR003 - Pimentones Tricolores",
        cantidad: 6,
        precioUnitario: 1500,
        subtotal: 9000,
      },
      {
        productoId: 1,
        productoNombre: "FR001 - Manzanas Fuji",
        cantidad: 4,
        precioUnitario: 1200,
        subtotal: 4800,
      },
    ],
  },
  {
    id: 12,
    fecha: "2024-06-11",
    numeroOrden: "SO1012",
    clienteId: 18,
    clienteNombre: "Andrés Felipe Muñoz Bravo",
    estado: "Enviado",
    monto: 8000,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 2,
        productoNombre: "FR002 - Naranjas Valencia",
        cantidad: 8,
        precioUnitario: 1000,
        subtotal: 8000,
      },
    ],
  },
  {
    id: 13,
    fecha: "2024-06-12",
    numeroOrden: "SO1013",
    clienteId: 19,
    clienteNombre: "Daniela Patricia Castro Fuentes",
    estado: "Procesando",
    monto: 9600,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 5,
        productoNombre: "VR002 - Espinacas Frescas",
        cantidad: 8,
        precioUnitario: 700,
        subtotal: 5600,
      },
      {
        productoId: 3,
        productoNombre: "FR003 - Plátanos Cavendish",
        cantidad: 5,
        precioUnitario: 800,
        subtotal: 4000,
      },
    ],
  },
  {
    id: 14,
    fecha: "2024-06-13",
    numeroOrden: "SO1014",
    clienteId: 4,
    clienteNombre: "Ana María Martínez López",
    estado: "Enviado",
    monto: 29800,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 7,
        productoNombre: "PO001 - Miel Organica",
        cantidad: 5,
        precioUnitario: 5000,
        subtotal: 25000,
      },
      {
        productoId: 9,
        productoNombre: "PL001 - Leche Entera",
        cantidad: 4,
        precioUnitario: 1200,
        subtotal: 4800,
      },
    ],
  },
  {
    id: 15,
    fecha: "2024-06-14",
    numeroOrden: "SO1015",
    clienteId: 5,
    clienteNombre: "Pedro Antonio Ramírez Castro",
    estado: "Cancelado",
    monto: 5400,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 4,
        productoNombre: "VR001 - Zanahorias Organicas",
        cantidad: 6,
        precioUnitario: 900,
        subtotal: 5400,
      },
    ],
  },
  {
    id: 16,
    fecha: "2024-06-15",
    numeroOrden: "SO1016",
    clienteId: 10,
    clienteNombre: "Juan Carlos Pérez Soto",
    estado: "Pendiente",
    monto: 21600,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 8,
        productoNombre: "PO002 - Quinua Organica",
        cantidad: 6,
        precioUnitario: 3000,
        subtotal: 18000,
      },
      {
        productoId: 1,
        productoNombre: "FR001 - Manzanas Fuji",
        cantidad: 3,
        precioUnitario: 1200,
        subtotal: 3600,
      },
    ],
  },
  {
    id: 17,
    fecha: "2024-06-16",
    numeroOrden: "SO1017",
    clienteId: 11,
    clienteNombre: "Carla Andrea López Muñoz",
    estado: "Procesando",
    monto: 10300,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 6,
        productoNombre: "VR003 - Pimentones Tricolores",
        cantidad: 5,
        precioUnitario: 1500,
        subtotal: 7500,
      },
      {
        productoId: 5,
        productoNombre: "VR002 - Espinacas Frescas",
        cantidad: 4,
        precioUnitario: 700,
        subtotal: 2800,
      },
    ],
  },
  {
    id: 18,
    fecha: "2024-06-17",
    numeroOrden: "SO1018",
    clienteId: 12,
    clienteNombre: "Roberto Andrés Sánchez Vera",
    estado: "Enviado",
    monto: 15000,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 2,
        productoNombre: "FR002 - Naranjas Valencia",
        cantidad: 15,
        precioUnitario: 1000,
        subtotal: 15000,
      },
    ],
  },
  {
    id: 19,
    fecha: "2024-06-18",
    numeroOrden: "SO1019",
    clienteId: 13,
    clienteNombre: "María Cristina Silva Rojas",
    estado: "Pendiente",
    monto: 14400,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 9,
        productoNombre: "PL001 - Leche Entera",
        cantidad: 12,
        precioUnitario: 1200,
        subtotal: 14400,
      },
    ],
  },
  {
    id: 20,
    fecha: "2024-06-19",
    numeroOrden: "SO1020",
    clienteId: 14,
    clienteNombre: "Diego Sebastián Morales Castro",
    estado: "Enviado",
    monto: 38000,
    departamento: "",
    comentario: "",
    detalles: [
      {
        productoId: 7,
        productoNombre: "PO001 - Miel Organica",
        cantidad: 6,
        precioUnitario: 5000,
        subtotal: 30000,
      },
      {
        productoId: 3,
        productoNombre: "FR003 - Plátanos Cavendish",
        cantidad: 10,
        precioUnitario: 800,
        subtotal: 8000,
      },
    ],
  },
];

// Funciones para gestión de órdenes en localStorage
export const getOrdenesFromStorage = () => {
  const storedOrdenes = localStorage.getItem("ListaOrdenes");
  if (storedOrdenes) {
    return JSON.parse(storedOrdenes);
  }
  return [];
};

export const getOrdenById = (id) => {
  const ordenes = getOrdenesFromStorage();
  return ordenes.find((orden) => orden.id === parseInt(id));
};

export const getOrdenesByCliente = (clienteId) => {
  const ordenes = getOrdenesFromStorage();
  return ordenes.filter((orden) => orden.clienteId === parseInt(clienteId));
};

export const saveOrdenToStorage = (nuevaOrden) => {
  try {
    const ordenes = getOrdenesFromStorage();

    // Generar nuevo ID
    const nuevoId =
      ordenes.length > 0 ? Math.max(...ordenes.map((o) => o.id)) + 1 : 1;

    // Calcular monto total
    const montoTotal = nuevaOrden.detalles.reduce(
      (sum, detalle) => sum + detalle.subtotal,
      0
    );

    const ordenCompleta = {
      id: nuevoId,
      fecha: new Date().toISOString().split("T")[0],
      numeroOrden: `SO${String(1000 + nuevoId).padStart(4, "0")}`,
      ...nuevaOrden,
      monto: montoTotal,
    };

    ordenes.push(ordenCompleta);
    localStorage.setItem("ListaOrdenes", JSON.stringify(ordenes));

    return { success: true, orden: ordenCompleta };
  } catch (error) {
    console.error("Error al guardar orden:", error);
    return { success: false, error: error.message };
  }
};

export const updateOrdenInStorage = (id, ordenActualizada) => {
  try {
    const ordenes = getOrdenesFromStorage();
    const index = ordenes.findIndex((o) => o.id === parseInt(id));

    if (index === -1) {
      return { success: false, error: "Orden no encontrada" };
    }

    // Recalcular monto si hay detalles
    if (ordenActualizada.detalles) {
      ordenActualizada.monto = ordenActualizada.detalles.reduce(
        (sum, detalle) => sum + detalle.subtotal,
        0
      );
    }

    ordenes[index] = { ...ordenes[index], ...ordenActualizada };
    localStorage.setItem("ListaOrdenes", JSON.stringify(ordenes));

    return { success: true, orden: ordenes[index] };
  } catch (error) {
    console.error("Error al actualizar orden:", error);
    return { success: false, error: error.message };
  }
};

export const deleteOrdenFromStorage = (id) => {
  try {
    const ordenes = getOrdenesFromStorage();
    const filteredOrdenes = ordenes.filter((o) => o.id !== parseInt(id));

    if (filteredOrdenes.length === ordenes.length) {
      return { success: false, error: "Orden no encontrada" };
    }

    localStorage.setItem("ListaOrdenes", JSON.stringify(filteredOrdenes));

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar orden:", error);
    return { success: false, error: error.message };
  }
};

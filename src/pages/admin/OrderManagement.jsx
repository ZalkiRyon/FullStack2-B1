import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrdenesFromStorage } from "../../utils/dataOrdenes";
import OrdenTable from "../../components/admin/OrdenTable";
import OrdenFilters from "../../components/admin/OrdenFilters";

const OrderManagement = () => {
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);
  const [filteredOrdenes, setFilteredOrdenes] = useState([]);
  const [numeroOrdenFilter, setNumeroOrdenFilter] = useState("");
  const [clienteFilter, setClienteFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("todos");
  const [montoFilter, setMontoFilter] = useState("todos");

  // Función para cargar órdenes
  const cargarOrdenes = () => {
    const ordenesStorage = getOrdenesFromStorage();
    setOrdenes(ordenesStorage);
    setFilteredOrdenes(ordenesStorage);
  };

  // Cargar órdenes al montar el componente
  useEffect(() => {
    cargarOrdenes();
  }, []);

  // Recargar órdenes cuando la página vuelva a estar visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        cargarOrdenes();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', cargarOrdenes);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', cargarOrdenes);
    };
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let resultado = [...ordenes];

    // Filtro por número de orden
    if (numeroOrdenFilter) {
      resultado = resultado.filter((orden) => {
        const numeroOrden = orden.numeroOrden.toLowerCase();
        const busqueda = numeroOrdenFilter.toLowerCase();
        return numeroOrden.includes(busqueda);
      });
    }

    // Filtro por cliente
    if (clienteFilter) {
      resultado = resultado.filter((orden) => {
        const clienteNombre = orden.clienteNombre.toLowerCase();
        const busqueda = clienteFilter.toLowerCase();
        return clienteNombre.includes(busqueda);
      });
    }

    // Filtro por estado
    if (estadoFilter !== "todos") {
      resultado = resultado.filter((orden) => orden.estado === estadoFilter);
    }

    // Filtro por rango de monto
    if (montoFilter !== "todos") {
      resultado = resultado.filter((orden) => {
        const monto = orden.monto;
        if (montoFilter === "0-5000") return monto >= 0 && monto <= 5000;
        if (montoFilter === "5000-10000") return monto > 5000 && monto <= 10000;
        if (montoFilter === "10000-20000") return monto > 10000 && monto <= 20000;
        if (montoFilter === "20000-30000") return monto > 20000 && monto <= 30000;
        if (montoFilter === "30000+") return monto > 30000;
        return true;
      });
    }

    setFilteredOrdenes(resultado);
  }, [numeroOrdenFilter, clienteFilter, estadoFilter, montoFilter, ordenes]);

  // Obtener estados únicos
  const estados = [...new Set(ordenes.map((o) => o.estado))];

  // Limpiar filtros
  const limpiarFiltros = () => {
    setNumeroOrdenFilter("");
    setClienteFilter("");
    setEstadoFilter("todos");
    setMontoFilter("todos");
  };

  // Función para ver detalles de orden
  const handleVer = (id) => {
    navigate(`/admin/orden/${id}`);
  };

  return (
    <div className="inventarioContainer">
      {/* Header */}
      <div className="inventarioHeader">
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle">Gestión de Órdenes</h1>
          <p className="inventarioSubtitle">
            Administra las órdenes de compra de Huerto Hogar
          </p>
        </div>
      </div>

      {/* Sección de la tabla */}
      <div className="inventarioTableSection">
        <h2 className="tableTitle">Lista de Órdenes</h2>

        {/* Filtros */}
        <OrdenFilters
          numeroOrdenFilter={numeroOrdenFilter}
          onNumeroOrdenChange={setNumeroOrdenFilter}
          clienteFilter={clienteFilter}
          onClienteChange={setClienteFilter}
          estadoFilter={estadoFilter}
          onEstadoChange={setEstadoFilter}
          montoFilter={montoFilter}
          onMontoChange={setMontoFilter}
          estados={estados}
          onLimpiar={limpiarFiltros}
        />

        {/* Tabla de órdenes */}
        <OrdenTable ordenes={filteredOrdenes} onVer={handleVer} />
      </div>
    </div>
  );
};

export default OrderManagement;

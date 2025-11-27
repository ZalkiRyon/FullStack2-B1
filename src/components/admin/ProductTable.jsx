import { productImages } from "../../utils/productUtils";

const ProductTable = ({ productos, onVer, onEditar, onEliminar }) => {
  return (
    <div className="tableContainer">
      <table className="productosTable">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => {
              const imagenSrc =
                productImages[producto.imagen] || productImages["default"];
              return (
                <tr key={producto.id}>
                  <td>
                    <img
                      src={imagenSrc}
                      alt={producto.nombre}
                      className="productoImagen"
                    />
                  </td>
                  <td className="productoCodigo">{producto.id}</td>
                  <td className="productoNombre">
                    {producto.nombre.split(" - ")[1] || producto.nombre}
                  </td>
                  <td>
                    <span className="categoriaBadge">{producto.categoria}</span>
                  </td>
                  <td className="productoPrecio">
                    ${producto.precio.toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`stockBadge ${
                        producto.stock < 100
                          ? "stockBajo"
                          : producto.stock <= 200
                          ? "stockMedio"
                          : "stockAlto"
                      }`}
                    >
                      {producto.stock}
                    </span>
                  </td>
                  <td>
                    <div className="accionesButtons">
                      {onVer && (
                        <button
                          onClick={() => onVer(producto.id)}
                          className="btnAccion btnVer"
                          title="Ver"
                        >
                          👁
                        </button>
                      )}
                      {onEditar && (
                        <button
                          onClick={() => onEditar(producto.id)}
                          className="btnAccion btnEditar"
                          title="Editar"
                        >
                          ✏
                        </button>
                      )}
                      {onEliminar && (
                        <button
                          onClick={() => onEliminar(producto.id)}
                          className="btnAccion btnEliminar"
                          title="Eliminar"
                        >
                          🗑
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="noResultados">
                No se encontraron productos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

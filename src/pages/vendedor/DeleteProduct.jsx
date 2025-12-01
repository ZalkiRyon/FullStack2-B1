import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import {
  deleteProductById,
  getAllProducts,
  getProductById,
} from "../../services/ProductsService";

const DeleteProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [categorias, setCategorias] = useState([]);

  // Cargar datos del producto
  useEffect(() => {
    const fetchProducts = async () => {
      const productoEncontrado = await getProductById(parseInt(id));

      if (productoEncontrado) {

        setProducto(productoEncontrado);
        const productos = await getAllProducts();
        // Cargar categorías únicas
        const categoriasUnicas = [
          ...new Set(productos.map((p) => p.categoria)),
        ];
        setCategorias(categoriasUnicas);
    

      } else {
        alert("Producto no encontrado");
        navigate("/vendedor/inventario");
      }
    };

        fetchProducts();
    
  }, [id, navigate]);

  const handleEliminar = async () => {
    const confirmacion = window.confirm(
      `¿Está seguro que desea eliminar el producto?\n\nNombre: ${producto.nombre}\nCategoría: ${producto.categoria}\nPrecio: $${producto.precio}\n\nEsta acción no se puede deshacer.`
    );

    if (confirmacion) {
      const isSuccesful = await deleteProductById(parseInt(id));

      if (isSuccesful) {
        alert("Producto eliminado exitosamente");
        navigate("/vendedor/inventario");
      } else {
        alert(`Error al eliminar producto con id ${id} `);
      }
    }
  };

  if (!producto) {
    return (
      <div className="inventarioContainer">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="inventarioContainer">
      {/* Header con estilo rojo de advertencia */}
      <div className="inventarioHeader" style={{ backgroundColor: "#dc3545" }}>
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle" style={{ color: "white" }}>
            Eliminar Producto
          </h1>
        </div>
      </div>

      {/* Formulario de solo lectura */}
      <div className="inventarioTableSection">
        <div className="formHeader" style={{ backgroundColor: "#dc3545" }}>
          <h2 className="formSectionTitle" style={{ color: "white" }}>
            DATOS DEL PRODUCTO A ELIMINAR
          </h2>
        </div>

        <form className="formAdmin">
          {/* Fila 1: Nombre y Categoría */}
          <div className="formGroupRow">
            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="nombre">
                Nombre del producto *
              </label>
              <input
                type="text"
                className="formInputAdmin"
                id="nombre"
                name="nombre"
                value={producto.nombre}
                disabled
              />
            </div>

            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="categoria">
                Categoría *
              </label>
              <select
                className="formInputAdmin formSelectAdmin"
                id="categoria"
                name="categoria"
                value={producto.categoria}
                disabled
              >
                <option value="">Seleccionar categoría...</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fila 2: Precio y Stock */}
          <div className="formGroupRow">
            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="precio">
                Precio ($) *
              </label>
              <input
                type="number"
                className="formInputAdmin"
                id="precio"
                name="precio"
                value={producto.precio}
                disabled
              />
            </div>

            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="stock">
                Stock *
              </label>
              <input
                type="number"
                className="formInputAdmin"
                id="stock"
                name="stock"
                value={producto.stock}
                disabled
              />
            </div>
          </div>

          {/* Imagen */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="imagen">
              Imagen
            </label>
            <select
              className="formInputAdmin formSelectAdmin"
              id="imagen"
              name="imagen"
              value={producto.imagen || ""}
              disabled
            >
              <option value="">Sin imagen</option>
              <option value="manzana.jpg">manzana.jpg</option>
              <option value="naranja.jpg">naranja.jpg</option>
              <option value="platano.jpg">platano.jpg</option>
              <option value="zanahoria.jpg">zanahoria.jpg</option>
              <option value="espinaca.jpg">espinaca.jpg</option>
              <option value="pimenton.jpg">pimenton.jpg</option>
              <option value="miel.jpg">miel.jpg</option>
              <option value="quinoa.jpg">quinoa.jpg</option>
              <option value="leche.jpg">leche.jpg</option>
              <option value="queso.jpg">queso.jpg</option>
              <option value="img-principal.jpg">img-principal.jpg</option>
            </select>
          </div>

          {/* Descripción */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              className="formInputAdmin formTextareaAdmin"
              id="descripcion"
              name="descripcion"
              rows="5"
              value={producto.descripcion || ""}
              disabled
            />
          </div>

          {/* Botones de acción */}
          <div className="formActionsGroup">
            <BackButton text="Volver" />
            <button
              type="button"
              className="btnEliminarUsuario"
              onClick={handleEliminar}
            >
              Eliminar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteProduct;

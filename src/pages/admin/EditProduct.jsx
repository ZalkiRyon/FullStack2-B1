import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import { getProductosFromStorage } from "../../utils/dataProductos";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categorias, setCategorias] = useState([]);
  const [productoOriginal, setProductoOriginal] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
  });

  // Cargar datos del producto
  useEffect(() => {
    const productos = getProductosFromStorage();
    const productoEncontrado = productos.find((p) => p.id === parseInt(id));

    if (productoEncontrado) {
      setProductoOriginal(productoEncontrado);

      // Extraer el nombre sin el código (después del " - ")
      const nombreSinCodigo = productoEncontrado.nombre.includes(" - ")
        ? productoEncontrado.nombre.split(" - ").slice(1).join(" - ")
        : productoEncontrado.nombre;

      setFormData({
        nombre: nombreSinCodigo,
        categoria: productoEncontrado.categoria,
        precio: productoEncontrado.precio,
        stock: productoEncontrado.stock,
        imagen: productoEncontrado.imagen || "",
        descripcion: productoEncontrado.descripcion || "",
      });
    } else {
      alert("Producto no encontrado");
      navigate("/admin/inventario");
    }

    // Cargar categorías únicas
    const categoriasUnicas = [...new Set(productos.map((p) => p.categoria))];
    setCategorias(categoriasUnicas);
  }, [id, navigate]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre.trim()) {
      alert("El nombre del producto es obligatorio");
      return;
    }

    if (!formData.categoria) {
      alert("Debe seleccionar una categoría");
      return;
    }

    if (parseInt(formData.precio) <= 0) {
      alert("El precio debe ser mayor a 0");
      return;
    }

    if (parseInt(formData.stock) < 0) {
      alert("El stock no puede ser negativo");
      return;
    }

    // Obtener productos actuales
    const productos = getProductosFromStorage();

    // Encontrar el índice del producto a editar
    const indiceProducto = productos.findIndex((p) => p.id === parseInt(id));

    if (indiceProducto === -1) {
      alert("Error: Producto no encontrado");
      return;
    }

    // Extraer el código del nombre original
    const codigoProducto = productoOriginal.nombre.includes(" - ")
      ? productoOriginal.nombre.split(" - ")[0]
      : "";

    // Crear producto actualizado manteniendo id y código original
    const productoActualizado = {
      id: parseInt(id),
      nombre: codigoProducto
        ? `${codigoProducto} - ${formData.nombre}`
        : formData.nombre,
      categoria: formData.categoria,
      precio: parseInt(formData.precio),
      stock: parseInt(formData.stock),
      imagen: formData.imagen || "img-principal.jpg",
      descripcion: formData.descripcion || "",
    };

    // Actualizar el producto en el array
    productos[indiceProducto] = productoActualizado;

    // Guardar en localStorage
    localStorage.setItem("ListaProductos", JSON.stringify(productos));

    alert("Producto actualizado exitosamente");
    navigate("/admin/inventario");
  };

  if (!productoOriginal) {
    return (
      <div className="inventarioContainer">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="inventarioContainer">
      {/* Header */}
      <div className="inventarioHeader">
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle">Editar Producto</h1>
        </div>
      </div>

      {/* Formulario */}
      <div className="inventarioTableSection">
        <div className="formHeader">
          <h2 className="formSectionTitle">DATOS DEL PRODUCTO</h2>
        </div>

        <form className="formAdmin" onSubmit={handleSubmit}>
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
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
              <small className="formHelperText">
                Código actual: {productoOriginal.nombre.split(" - ")[0]}
              </small>
            </div>

            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="categoria">
                Categoría *
              </label>
              <select
                className="formInputAdmin formSelectAdmin"
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                required
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
                min="0"
                step="1"
                value={formData.precio}
                onChange={handleInputChange}
                required
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
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleInputChange}
                required
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
              value={formData.imagen}
              onChange={handleInputChange}
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
              <option value="img-principal.jpg">img-principal.jpg</option>
            </select>
            <small className="formHelperText">
              Formatos: JPG, PNG, GIF (máx. 2MB)
            </small>
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
              placeholder="Descripción detallada del producto..."
              value={formData.descripcion}
              onChange={handleInputChange}
            />
          </div>

          {/* Botones de acción */}
          <div className="formActionsGroup">
            <BackButton text="Volver" />
            <button type="submit" className="btnGuardarCambios">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

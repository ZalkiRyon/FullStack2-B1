import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";
import { getProductosFromStorage, saveProductoToStorage } from "../../utils/dataProductos";
import { PREFIJOS_CATEGORIA } from "../../utils/data";

const NewProduct = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
  });

  // Cargar categorías únicas de productos existentes
  useEffect(() => {
    const productos = getProductosFromStorage();
    const categoriasUnicas = [...new Set(productos.map((p) => p.categoria))];
    setCategorias(categoriasUnicas);
  }, []);

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

    // Guardar producto
    const resultado = saveProductoToStorage(formData);
    
    if (resultado.success) {
      const mensaje = `✓ Producto creado exitosamente\n\n` +
                     `Nombre: ${resultado.producto.nombre}\n` +
                     `ID: ${resultado.producto.id}\n` +
                     `Categoría: ${resultado.producto.categoria}\n` +
                     `Precio: $${resultado.producto.precio}\n` +
                     `Stock: ${resultado.producto.stock} unidades\n\n` +
                     `El producto ya está disponible en el inventario.`;
      alert(mensaje);
      navigate("/admin/inventario");
    } else {
      alert(`✗ Error al crear producto\n\nDetalle: ${resultado.error}\n\nPor favor, intente nuevamente.`);
    }
  };

  return (
    <div className="inventarioContainer">
      {/* Header */}
      <div className="inventarioHeader">
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle">Agregar Nuevo Producto</h1>
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

          {/* Botón de guardar */}
          <div className="formActions">
            <PrimaryButton text={"Guardar Producto"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;

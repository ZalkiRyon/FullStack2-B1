import { useEffect, useState } from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import Footer from "../../components/store/Footer";
import ProductCard from "../../components/store/ProductCard";
import { getAllProducts } from "../../services/ProductsService";

const HomePage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      // Filtrar productos con stock > 0 y tomar los primeros 3
      const productosConStock = res.filter(p => p.stock > 0);
      setProductos(productosConStock.slice(0, 3));
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ backgroundColor: "#F4F5F7" }}>
      <section className="seccion-principal">
        <div className="izq-seccion-principal gap-2">
          <div className="texto-seccion-principal">
            <h1>Huerto Hogar</h1>
            <p>
              ¡Descubre la frescura del campo con HuertoHogar!
              <br />
              Conéctate con la naturaleza y lleva lo mejor del campo a tu mesa.
              <br />
              ¡Únete a nosotros y disfruta de productos frescos y saludables,
              directo a tu hogar!
            </p>
          </div>
          <PrimaryButton
            text={"Ver productos"}
            to={"/productos"}
            width="fit-content"
          />
        </div>
      </section>

      <section className="seccion-productos">
        <h2 className="seccion-productos-title">Productos Destacados</h2>
        <div className="productsListContainer">
          {productos.length > 0 ? (
            productos.map((produc) => (
              <ProductCard
                key={produc.id}
                id={produc.id}
                name={produc.nombre}
                price={produc.precio}
                category={produc.categoria}
                image={produc.imagen}
                variant="default"
              />
            ))
          ) : (
            <div>No hay productos para mostrar</div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

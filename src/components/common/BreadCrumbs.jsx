import { useLocation, Link } from "react-router-dom";
import { getProductosFromStorage } from "../../utils/dataProductos";
const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((path) => path);

  const getProductNameById = (id) => {
    const productos = getProductosFromStorage();
    const producto = productos.find((p) => p.id == id);

    return producto ? producto.nombre : `Producto ${id}`;
  };

  const formatBreadcrumbName = (value, index, pathnames) => {
    const previousValue = pathnames[index - 1];

    // regex para determinar digitos
    if (previousValue === "productos" && /^\d+$/.test(value)) {
      const productName = getProductNameById(value);
      return productName;
    }

    return value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
  };

  return (
    <nav aria-label="breadcrumb" className="breadcrumbsNav">
      <ul className="breadcrumbList">
        <li className="breadcrumbItem">
          <Link to="/">Inicio</Link>
        </li>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const name = formatBreadcrumbName(value, index, pathnames);

          return (
            <li key={to} className="breadcrumbItem">
              <span className="breadcrumbSeparator">{">"}</span>
              {isLast ? (
                <span className="breadcrumbCurrent"> {name} </span>
              ) : (
                <Link to={to}>{name}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;

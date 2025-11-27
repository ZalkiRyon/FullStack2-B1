import { useLocation, Link } from "react-router-dom";
import { getProductNameById } from "../../services/ProductsService";
import { useEffect, useState } from "react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);
  const [productNames, setProductNames] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const productIndex = pathnames.findIndex(
      (path, index) =>
        path === "productos" && /^\d+$/.test(pathnames[index + 1])
    );

    if (productIndex !== -1) {
      const productId = pathnames[productIndex + 1];

      if (!productNames[productId] && !loading) {
        setLoading(true);
        getProductNameById( parseInt( productId ) )
          .then((name) => {
            if (name) {
              setProductNames((prevNames) => ({
                ...prevNames,
                [productId]: name,
              }));
            } else {
              setProductNames((prevNames) => ({
                ...prevNames,
                [productId]: `ID: ${productId}`,
              }));
            }
          })
          .catch(() => {
            setProductNames((prevNames) => ({
              ...prevNames,
              [productId]: `Error ID: ${productId}`,
            }));
          })
          .finally(() => setLoading(false));
      }
    }
  }, [location.pathname, pathnames, productNames, loading]);

  const formatBreadcrumbName = (value, index, pathnames) => {
    const previousValue = pathnames[index - 1];

    if (previousValue === "productos" && /^\d+$/.test(value)) {
      return productNames[value] || (loading ? "Cargando..." : `ID: ${value}`);
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

/**
 * Objeto contenedor para la lógica del componente DiscountProductCard.
 */
window.DiscountProductCardLogic = (() => {
 

  // ... (cuerpo de las funciones calculateInflatedPrice, getProductImageSrc, formatPriceCLP)
  const calculateInflatedPrice = (price) => {
    if (typeof price !== "number" || price <= 0 || isNaN(price)) {
      return 0;
    }
    const divisor = 1 - 0.25;
    return price / divisor;
  };
  
  const getProductImageSrc = (imageName, productImagesMap) => {
    if (!productImagesMap || !productImagesMap["default"]) {
      return "";
    }
    return productImagesMap[imageName] || productImagesMap["default"];
  };

  const formatPriceCLP = (price) => {
    if (typeof price !== "number" || isNaN(price)) {
      return "0";
    }
    return price.toLocaleString("es-CL", {
      maximumFractionDigits: 0,
    });
  };

  return {
    calculateInflatedPrice,
    getProductImageSrc,
    formatPriceCLP,
  };
})();
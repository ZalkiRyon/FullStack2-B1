import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const getStoredCart = () => {
    const storedCart = localStorage.getItem("Carrito");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const updateCart = (newItems) => {
    setCartItems(newItems);
    localStorage.setItem("Carrito", JSON.stringify(newItems));

    const count = newItems.reduce((acc, item) => acc + item.cantidad, 0);
    setTotalItemsCount(count);
  };

  useEffect(() => {
    const initialCart = getStoredCart();
    updateCart(initialCart);
  }, []);

  const addItem = (product, quantity) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    let newItems;

    if (existingItemIndex > -1) {
      newItems = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, cantidad: item.cantidad + quantity }
          : item
      );
    } else {
      newItems = [...cartItems, { ...product, cantidad: quantity }];
    }
    updateCart(newItems);
  };

  const deleteItem = (product, quantity) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex === -1) return;

    const newItems = cartItems
      .map((item, index) =>
        index === existingItemIndex
          ? { ...item, cantidad: item.cantidad - quantity }
          : item
      )
      .filter((item) => item.cantidad > 0);

    updateCart(newItems);
  };

  const cleanCart = () => {
    updateCart([]);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const value = {
    cartItems,
    totalItemsCount,
    addItem,
    deleteItem,
    cleanCart,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('techfest-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('techfest-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (eventItem) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === eventItem.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === eventItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...eventItem, quantity: 1 }];
    });
  };

  const removeFromCart = (eventId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== eventId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.fee * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

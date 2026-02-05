import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoAnterior) => {
      const index = carritoAnterior.findIndex(
        (articulo) => articulo.id === producto.id
      );

      if (index >= 0) {
        return carritoAnterior.map((item, i) =>
          i === index
            ? { ...item, cantidad: item.cantidad + (producto.cantidad ?? 1) }
            : item
        );
      }

      return [...carritoAnterior, { ...producto, cantidad: producto.cantidad ?? 1 }];
    });
  };

  const actualizarCantidad = (productoId, cambio) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((producto) =>
        producto.id === productoId
          ? { ...producto, cantidad: Math.max(1, producto.cantidad + cambio) }
          : producto
      )
    );
  };

  const eliminarProducto = (productoId) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter((producto) => producto.id !== productoId)
    );
  };

  const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  const totalPrecio = carrito.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarProducto,
        totalCantidad,
        totalPrecio
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

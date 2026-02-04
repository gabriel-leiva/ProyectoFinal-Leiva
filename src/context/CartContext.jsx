import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [carrito, setCarrito] = useState([])

    const agregarAlCarrito = (producto) => {
        setCarrito((carritoAnterior) => {
            const yaExisteElProducto = carritoAnterior.findIndex(
                (articulo) => articulo.id === producto.id
            );
            if(yaExisteElProducto >= 0){
                return carritoAnterior.map((item, index) => 
                index === yaExisteElProducto 
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
                    );
            } else{
                return [...carritoAnterior, {...producto, cantidad: 1}]
            }
        })
    }

    const actualizarCantidad = (productoId, cantidad) => {
        setCarrito((carritoAnterior) => 
            carritoAnterior.map((producto) => 
                producto.id === productoId
        ? {...producto, cantidad: producto.cantidad + cantidad}
        : producto
            )
        )
    }

    const eliminarProducto = (productoId) => {
        setCarrito((carritoAnterior) => 
            carritoAnterior.filter((producto) => 
                producto.id !== productoId
            )
        )
    }

  return (
    <CartContext.Provider value={{carrito, agregarAlCarrito, actualizarCantidad, eliminarProducto}}>
        {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);
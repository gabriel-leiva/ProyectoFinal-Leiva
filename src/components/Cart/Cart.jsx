import React, { useState } from 'react'
import { useCart } from '../../context/CartContext'
import './Cart.css'
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { formatCurrency } from '../../utils/formatCurrency';

const Cart = () => {
  const { carrito, actualizarCantidad, eliminarProducto } = useCart();

  const [compraRealizada, setCompraRealizada] = useState(false);

  const costoDeEnvio = 1000;
  const subTotal = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  const total = subTotal + costoDeEnvio;

  const handleAumentarCantidad = (productoId) => {
    actualizarCantidad(productoId, 1);
  };

  const handleDisminuirCantidad = (productoId) => {
    const producto = carrito.find((item) => item.id === productoId);
    if (producto.cantidad > 1) {
      actualizarCantidad(productoId, -1);
    }
  };

  return (
    <div className="cart-container">
      <h2>TU <span>CARRITO</span></h2>

      {/* ✅ MENSAJE DE COMPRA FINALIZADA */}
      {compraRealizada ? (
        <h2 className="success-message">✅ ¡Compra realizada con éxito!</h2>
      ) : carrito.length === 0 ? (
        <p>Tu carrito esta vacio</p>
      ) : (
        <>
          <div className="cart-header">
            <p>Producto</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Accion</p>
          </div>

          <ul className="cart-items">
            {carrito.map((producto) => {
              const totalPrecio = producto.precio * producto.cantidad;

              return (
                <li className="cart-item" key={producto.id}>
                  <div className="producto-info">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="product-images"
                    />
                    <p>{producto.nombre}</p>
                  </div>

                  <p>{formatCurrency(producto.precio)}</p>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDisminuirCantidad(producto.id)}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      className="quantity-input"
                      readOnly
                      value={producto.cantidad}
                    />

                    <button
                      className="quantity-btn"
                      onClick={() => handleAumentarCantidad(producto.id)}
                    >
                      +
                    </button>
                  </div>

                  <p>{formatCurrency(totalPrecio)}</p>

                  <button
                    className="delete-btn"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ✅ RESUMEN + FORMULARIO SOLO SI HAY PRODUCTOS */}
          <div className="cart-summary">
            <h2>RESUMEN</h2>
            <p>Subtotal: <span>{formatCurrency(subTotal)}</span></p>
            <p>Costo de envio: <span>{formatCurrency(costoDeEnvio)}</span></p>
            <p className="total">Total: <span>{formatCurrency(total)}</span></p>

            {/* 👇 AVISA AL CART QUE LA COMPRA TERMINÓ */}
            <CheckoutForm onCompraFinalizada={() => setCompraRealizada(true)} />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

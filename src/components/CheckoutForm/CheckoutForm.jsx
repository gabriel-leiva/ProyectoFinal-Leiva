import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./CheckoutForm.css";

const CheckoutForm = ({ onCompraFinalizada }) => {
  const { vaciarCarrito } = useCart();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 acá después vamos a guardar en Firebase

    onCompraFinalizada(); // avisa al Cart
    vaciarCarrito();      // vacía el carrito
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3>Finalizar compra</h3>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        required
      />

      <button type="submit" className="checkout-btn">
        Finalizar compra
      </button>
    </form>
  );
};

export default CheckoutForm;

import React, { useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import "../ItemDetailContainer/ItemDetailContainer.css";

const ItemDetail = ({ producto }) => {
  const { agregarAlCarrito } = useCart();
  const [agregado, setAgregado] = useState(false);

  const handleAdd = (cantidad) => {
    agregarAlCarrito({
      id: producto.id,
      imagen: producto.image,
      nombre: producto.title,
      precio: producto.price,
      cantidad,
    });

    setAgregado(true);
  };

  return (
    <div className="product-details">
      {/* Imagen */}
      <img src={producto.image} alt={producto.title} />

      {/* Información del producto */}
      <div className="product-infos">
        <h1>{producto.title}</h1>

        <p className="price">{formatCurrency(producto.price)}</p>

        <p className="description">{producto.description}</p>

        {/* Lógica obligatoria de la consigna */}
        {!agregado ? (
          <ItemCount stock={producto.stock} onAdd={handleAdd} />
        ) : (
          <p>✅ Producto agregado al carrito</p>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;

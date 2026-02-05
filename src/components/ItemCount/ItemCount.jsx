import React, { useState } from "react";
import "../ItemDetailContainer/ItemDetailContainer.css";

const ItemCount = ({ stock, onAdd }) => {
  const [cantidad, setCantidad] = useState(1);

  const sumar = () => {
    if (cantidad < stock) setCantidad(cantidad + 1);
  };

  const restar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  return (
    <div className="item-count">
      <div className="quantity-controls">
        <button className="quantity-btn" onClick={restar}>
          −
        </button>

        <span className="quantity-number">{cantidad}</span>

        <button className="quantity-btn" onClick={sumar}>
          +
        </button>
      </div>

      <button
        className="add-to-cart"
        onClick={() => onAdd(cantidad)}
        disabled={stock === 0}
      >
        {stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
};

export default ItemCount;

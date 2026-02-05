import React from "react";
import '../ItemListContainer/ItemListContainer.css'

const Item = ({ producto, onClick }) => {
  return (
    <div className="product-card" onClick={() => onClick(producto.id)}>
      <img
        src={producto.image}
        alt={producto.title}
        className="product-image"
      />
      <h3>{producto.title}</h3>
      <p>${producto.price}</p>
    </div>
  );
};

export default Item;

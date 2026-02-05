import React from "react";
import Item from "../Item/Item";
import '../ItemListContainer/ItemListContainer.css'

const ItemList = ({ productos, onItemClick }) => {
  return (
    <div className="products">
      {productos.map((producto) => (
        <Item
          key={producto.id}
          producto={producto}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default ItemList;

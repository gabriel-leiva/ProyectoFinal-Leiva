import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../data/firestore";
import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) throw new Error("Producto no encontrado");

        setProducto({ id: docSnap.id, ...docSnap.data() });
      } catch (err) {
        setError("Error al cargar el producto");
      }
    };

    fetchProducto();
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!producto) return <p>Cargando...</p>;

  return <ItemDetail producto={producto} />;
};

export default ItemDetailContainer;

import React, { useEffect, useState } from "react";
import "./ItemListContainer.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../data/firestore";
import ItemList from "../ItemList/ItemList";

const ItemListContainer = ({ buscarTermino }) => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState("Relevantes");
  const [filtros, setFiltros] = useState({ categorias: [] });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));

        const productosFirestore = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(productosFirestore);
      } catch (err) {
        setError("Error al cargar productos");
        console.error(err);
      }
    };

    fetchProductos();
  }, []);

  const toggleFiltros = (tipoFiltro, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [tipoFiltro]: prev[tipoFiltro].includes(valor)
        ? prev[tipoFiltro].filter((item) => item !== valor)
        : [...prev[tipoFiltro], valor],
    }));
  };

  const normalizarTexto = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const productosFiltrados = productos.filter((producto) => {
    const matchCategoria =
      filtros.categorias.length === 0 ||
      filtros.categorias.includes(producto.category);

    const matchBuscar =
      !buscarTermino ||
      normalizarTexto(producto.title).includes(normalizarTexto(buscarTermino)) ||
      normalizarTexto(producto.description).includes(
        normalizarTexto(buscarTermino)
      );

    return matchCategoria && matchBuscar;
  });

  const handleOrdenChange = (e) => {
    setOrden(e.target.value);
  };

  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (orden === "Precio: Menor a Mayor") return a.price - b.price;
    if (orden === "Precio: Mayor a Menor") return b.price - a.price;
    return 0;
  });

  const handleItemClick = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <section className="main-content">
      <aside className="filters">
        <h2>Filtros</h2>

        <div className="filter-category">
          <h3>Categorías</h3>

          <label>
            <input
              type="checkbox"
              onChange={() => toggleFiltros("categorias", "laptops")}
            />
            <span>Laptops</span>
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => toggleFiltros("categorias", "monitores")}
            />
            <span>Monitores</span>
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => toggleFiltros("categorias", "tarjetas graficas")}
            />
            <span>Tarjetas Gráficas</span>
          </label>
        </div>
      </aside>

      <main className="collections">
        <div className="options">
          <h2>Todos los productos</h2>

          <label>
            Ordenar por:
            <select onChange={handleOrdenChange} value={orden}>
              <option>Relevantes</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
            </select>
          </label>
        </div>

        {error ? (
          <p className="error-message">{error}</p>
        ) : productosOrdenados.length > 0 ? (
          <ItemList productos={productosOrdenados} onItemClick={handleItemClick} />
        ) : (
          <p className="no-results">
            No hay productos que coincidan con los filtros seleccionados
          </p>
        )}
      </main>
    </section>
  );
};

export default ItemListContainer;

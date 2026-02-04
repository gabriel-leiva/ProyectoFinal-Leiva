import React, { useEffect, useState } from 'react'
import './ItemDetailContainer.css'
import { useParams} from 'react-router-dom'
import { formatCurrency } from "../../utils/formatCurrency";
import { useCart } from '../../context/CartContext';

const ItemDetailContainer = () => {
    const {id} = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);

    const {agregarAlCarrito} = useCart();
    const handleAgregarAlCarrito = () => {
        if(producto){
            agregarAlCarrito({
                id: producto.id,
                imagen: producto.image,
                nombre: producto.title,
                precio: producto.price,
                cantidad: 1
            })
        }
    }
 
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch("/products.json")
                if(!response.ok) {
                    throw new Error("Error al cargar los detalles del producto")
                }
                const data = await response.json();
                const productoEncontrado = data.find(
                        (item) => item.id === Number(id)
                )

                if (!productoEncontrado) {
                throw new Error("Producto no encontrado")
                }

                setProducto(productoEncontrado)

            } catch (err) {
                setError(err.message)
            }
        };
        fetchProducto();
    }, [id])

    if(error){
        return <h2 className='error-message'>{error}</h2>
    }

    

  return (
    <div className="product-details">
        {
            producto ? (
                <>
                    <img src={producto.image} alt={producto.title}/>
                    <div className='product-infos'>
                        <h1>{producto.title}</h1>
                        <p className='price'>{formatCurrency(producto.price)}</p>
                        <p className='description'>{producto.description}</p>
                        <button className='add-to-cart' onClick={handleAgregarAlCarrito}>Añadir al carrito</button>
                    </div>

                
                </>
            ) : (
                <p>Cargando Producto...</p>
            )
        }
    </div>
  )
}

export default ItemDetailContainer
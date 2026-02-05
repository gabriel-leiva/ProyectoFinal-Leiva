import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const NavBar = ({alternarBuscador}) => {
    const{carrito} = useCart();

    const navigate = useNavigate();

    const totalProductos = carrito.reduce((acc, producto) => 
        acc + producto.cantidad, 0
    )

    const handleHome = () => {
        alternarBuscador();
        navigate('/')
    }

  return (
    <header className='header'>
        <h1 className='logo'>Tech<span>Point</span></h1>
        <nav className='navbar'>
            <ul className='nav-links'>
                <li>
                    <Link to='/'>Inicio</Link>
                </li>
            </ul>
        </nav>

        <div className='icons'>
            <button className='search-button' onClick={handleHome}>
                <i className='fas fa-search'></i>
            </button>

            <Link to='/carrito' className='icon-button'>
                <i className='fas fa-shopping-cart'></i>
                <span className='counter'>{totalProductos}</span>
            </Link>
        </div>
    </header>
  )
}

export default NavBar
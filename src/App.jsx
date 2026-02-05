import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { CartProvider } from './context/CartContext'
import Cart from './components/Cart/Cart'
import Search from './components/Search/Search'



const App = () => {

  const [buscarTermino, setBuscarTermino] = useState("");

  const [mostrarBuscador, setMostrarBuscador] = useState(false)

  const handleBuscar = (termino) => {
    setBuscarTermino(termino.toLoweCase())
  }

  const alternarBuscador = () => {
    setMostrarBuscador(!mostrarBuscador)
  }

  return (
    <>
      <CartProvider>
        <Router>
          <NavBar alternarBuscador = {alternarBuscador}/>
          <Routes>
            <Route path='/' element={<Home buscarTermino = {buscarTermino} mostrarBuscador = {mostrarBuscador}/>}/>
            <Route path='/producto/:id' element={<ItemDetailContainer/>}/>
            <Route path='/carrito' element={<Cart/>}/>
            <Route path='/search' element={<Search onSearch = {handleBuscar}/>}/>
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
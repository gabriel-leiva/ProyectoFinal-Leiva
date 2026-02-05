import React, { useState } from 'react'
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import Search from '../Search/Search'
import Portada from '../Portada/Portada'

const Home = ({buscarTermino, mostrarBuscador}) => {

  const [buscarTerminoLocal, setBuscarTerminoLocal] = useState("")

  const handleBuscar = (termino) => {
    setBuscarTerminoLocal(termino)
  }

  return (
    <>
      {!mostrarBuscador && <Portada/>}
      {mostrarBuscador && <Search onSearch = {handleBuscar}/>}
    
      <ItemListContainer buscarTermino = {buscarTerminoLocal || buscarTermino}/>
    </>
  )
}

export default Home
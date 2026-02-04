import React, { useState } from 'react'
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import Search from '../Search/Search'

const Home = ({buscarTermino}) => {

  const [buscarTerminoLocal, setBuscarTerminoLocal] = useState("")

  const handleBuscar = (termino) => {
    setBuscarTerminoLocal(termino)
  }

  return (
    <>
      <Search onSearch = {handleBuscar}/>
      <ItemListContainer buscarTermino = {buscarTerminoLocal || buscarTermino}/>
    </>
  )
}

export default Home
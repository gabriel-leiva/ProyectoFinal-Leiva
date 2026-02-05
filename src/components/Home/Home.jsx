import React from 'react'
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import Search from '../Search/Search'
import Portada from '../Portada/Portada'

const Home = ({ buscarTermino, mostrarBuscador, onSearch }) => {

  return (
    <>
      {!mostrarBuscador && <Portada />}

      {mostrarBuscador && (
        <Search
          buscarTermino={buscarTermino}
          onSearch={onSearch}
        />
      )}

      <ItemListContainer buscarTermino={buscarTermino} />
    </>
  )
}

export default Home


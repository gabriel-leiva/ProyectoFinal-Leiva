import React from 'react'
import './Search.css'

const Search = ({ buscarTermino, onSearch }) => {

  const handleBuscarChange = (e) => {
    onSearch(e.target.value)
  }

  return (
    <section className='search'>
      <input
        type="search"
        placeholder='Buscar'
        className='search-bar'
        value={buscarTermino}
        onChange={handleBuscarChange}
      />
    </section>
  )
}

export default Search

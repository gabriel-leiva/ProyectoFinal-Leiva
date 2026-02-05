import React from 'react'
import './Portada.css'
import portada from '../../assets/imgs/portada.png'

const Portada = () => {
  return (
    <section className='portada-container'>
        <div className="portada-text">
            <p className="subtitle">Potencia tu setup con las mejores laptops y hardware</p>
            <h1 className="title">Especialistas en tecnologia</h1>
            <p className="cta">COMPRA AHORA</p>
        </div>

        <div className="portada-imagen">
            <img src={portada} alt="portada" className='imagen'/>
        </div>
    </section>
  )
}

export default Portada
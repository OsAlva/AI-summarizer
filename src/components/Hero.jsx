import React from 'react'
import  logo  from '../assets/logo.png'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={logo} alt="logo" className='w-24 object-contain'/> {/* El contenido está dimensionado para mantener su relación de aspecto mientras se ajusta dentro del cuadro de contenido del elementos. */}
        </nav>
        

        <h1 className="head_text">
            Summarize your text with <br className='max-md:hidden'/> <span className="text-blue-500">AI</span>
        </h1>
        <h2 className="desc">Simplify your text into clear and concise summaries</h2>
     

    </header>
  )
}

export default Hero
import React from 'react'
import {useState, useEffect} from 'react'

import {copy, linkIcon, loader, tick} from '../assets'

const Demo = () => {
    const [article, setArticle]  = useState({
        url: '',
        summary: '',
    });

    const handleSubmit = async(e) => {
        e.prevent.default
        alert("Enviado");
    }

  return (
    <section className='mt-16 w-full max-w-xl'>

        <div className="flex flex-col w-full gap-2">
        {/* hacemos un formulario utilizamos el evento onSubmit para  manejar el envio de los datos del formulario  */}
            <form className="relative flex justify-center items-center" onSubmit={handleSubmit }>  
                <img src={linkIcon} alt="link_icon" className='absolute left-4 top-1/2 transform -translate-y-1/2 w-6'/>
                <input type="url" placeholder='Paste your link here' className='url_input peer' value={article.url} onChange={(e) => setArticle({article, url: e.target.value})} required /> {/*  el value hace referencia estado 'article' el atributo 'url' donde se guardará */}
                <button type="submit" className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>Summarize</button>
            </form>

            {/* Browse URL History  */}
        </div>

        {/* Display Results */}

    </section>

  )
}

export default Demo
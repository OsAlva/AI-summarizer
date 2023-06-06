import React from 'react'
import {useState, useEffect} from 'react'

import {copy, linkIcon, loader, tick} from '../assets'
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
    const [article, setArticle]  = useState({
        url: '',
        summary: '',
    });

    const [allArticle, setAllArticle] = useState([]); //guarda todos los articulos que se han resumido

    const [getSummary, { error, isFetching}] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles')) || []; //obtenemos los articulos del localstorage

        if(articlesFromLocalStorage){
            setAllArticle(articlesFromLocalStorage); //actualizamos el estado 'allArticle' con los articulos del localstorage
        }

    }, []); //se ejecuta cuando el componente se monta por primera vez

    const handleSubmit = async(e) => {
        e.preventDefault(); //evita que el navegador se actualice cuando se envía el formulario
        const {data} = await getSummary({articleUrl: article.url});

        if(data?.summary) {
            const newArticle = {...article, summary: data.summary}; //creamos un nuevo objeto con el estado 'article' y el atributo 'summary' donde se guardará el resumen

            const updatedArticles = [newArticle, ...allArticle]; //creamos un nuevo array con todos los articulos que se han resumido

            setArticle(newArticle); //actualizamos el estado 'article' con el nuevo objeto
            setAllArticle(updatedArticles); //actualizamos el estado 'allArticle' con el nuevo array
            console.log("articuloooos", updatedArticles);

            localStorage.setItem('articles', JSON.stringify(updatedArticles)); //guardamos los articulos en el localstorage
        }
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
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
    const [copied, setCopied] = useState(""); //guarda el estado de la copia del resumen
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
    //copiar el resumen
    const handleCopy = (copyUrl) => {
        setCopied(copyUrl); //actualizamos el estado 'copied' con la url del resumen que se ha copiado
        navigator.clipboard.writeText(copyUrl); //copiamos el resumen al portapapeles
        setTimeout(() => setCopied((false), 3000)); //actualizamos el estado 'copied' a false despues de 3 segundos

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
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto bg-gray-800"> {/* mostramos los articulos que se han resumido */} 
                {allArticle.map((item, index) => (
                    <div
                        key={`link-${index}`}
                        onClick={()=> setArticle(item)}
                        className="link_card"
                    >
                        <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                            <img src={copied === item.url ? tick : copy} alt="copy_icon" className='w-[40%] h-[40%] object-contain'/> 
                        </div>
                        <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                            {item.url}
                        </p>
                    </div>
                ))}
            

            </div>
        </div>

        {/* Display Results */}
        <div className="my-10 max-w-full flex justify-center items-center">
            {isFetching ? (
                <img src={loader} alt="loader" className='w-20 h-20 object-contain'/>
            ) : error ? (  
                <p className='font-inter font-bold text-black text-center'>
                    Well, this is embarrassing. We couldnt summarize this article. Please try another one.
                    <br/>
                    <span className="font-satoshi font-normal text-gray-700">
                         {error?.data?.error || 'Something went wrong'}
                    </span>
                </p>
            ) : (
                article.summary && (
                    <div className="flex flex-col gap-3 z-40">
                        <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                            Article <span className="blue_gradient">Summary</span>
                        </h2>
                        <div className="summary_box">
                            <p className='font-inter font-medium text-gray-700 text-sm'>
                                {article.summary}
                            </p>
                        </div>
                    </div>
                )
            )}
        </div>
    </section>

  )
}

export default Demo
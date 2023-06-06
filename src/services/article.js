import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({ //proporciona el objeto de opciones de configuración para la API
    reducerPath: 'articleApi', //proporciona el nombre de la clave de la porción del estado que se utilizará para almacenar el estado de la APIç
});

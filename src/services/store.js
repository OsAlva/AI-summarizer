import {configureStore} from '@reduxjs/toolkit';
import { articleApi } from './article';

export const store = configureStore({
    reducer: {[articleApi.reducerPath]: articleApi.reducer}, //nos permite obtener una porción del estado global para reducir todo el estado para tomar solo lo que necesitamos.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)     ,
});

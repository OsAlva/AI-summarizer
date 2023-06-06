import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {}, //nos permite obtener una porción del estado global para reducir todo el estado para tomar solo lo que necesitamos.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

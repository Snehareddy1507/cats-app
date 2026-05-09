import { configureStore } from '@reduxjs/toolkit';
import { catApi } from '../services/catApi';

export const store = configureStore({
  reducer: {
    [catApi.reducerPath]: catApi.reducer,
 
  }, 

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(catApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
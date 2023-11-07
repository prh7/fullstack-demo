import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import carsReducer from './slices/cars';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, carsReducer)

export const store = configureStore({
  reducer: {
    cars: persistedReducer
  }
});

export const persistor = persistStore(store)

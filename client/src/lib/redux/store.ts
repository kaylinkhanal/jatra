import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  userSlice  from './features/user/userSlice'
import { persistStore, persistReducer,  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from 'redux-logger';
const persistConfig = {
    key: "root",
    storage,
  };
const rootReducer = combineReducers({ 
    user: userSlice
})
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger)
})

export const persistor = persistStore(store);

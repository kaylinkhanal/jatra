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
import  notificationSlice  from './features/notification/notificationSlice';
const persistConfig = {
    key: "root",
    storage,
    blacklist: ['notification']
  };
const rootReducer = combineReducers({ 
    user: userSlice,
    notification: notificationSlice
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

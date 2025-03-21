import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  userSlice  from './features/user/userSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
  };
const rootReducer = combineReducers({ 
    user: userSlice
})
  
const persistedReducer = persistReducer(persistConfig, rootReducer);
  
export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store);

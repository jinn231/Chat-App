import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// }


// const rootReducer = combineReducers({
//   user: UserSlice
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)


// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })

// export const persistor = persistStore(store)


const store = configureStore({
  reducer: {
    user: UserSlice
  }
})

export default store;
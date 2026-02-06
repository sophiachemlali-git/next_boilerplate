import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { persistStore } from 'redux-persist'

import persistedReducer from './persistConfig'

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store

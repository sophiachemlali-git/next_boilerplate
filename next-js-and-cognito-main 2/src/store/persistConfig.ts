import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer } from 'redux-persist'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer

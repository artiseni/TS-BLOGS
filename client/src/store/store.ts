import { configureStore } from '@reduxjs/toolkit'
import hooksReducer from './hooks'
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'



const persisConfig = {
    index_post: {
        key: 'index_post',
        storage
    }
}

const store = configureStore({
    reducer: {
        data: persistReducer(persisConfig.index_post, hooksReducer),
        page: hooksReducer
    },
    middleware: []
})

const persistore = persistStore(store)

export { store, persistore }
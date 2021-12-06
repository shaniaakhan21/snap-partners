import { configureStore } from '@reduxjs/toolkit'
import { userReducer, authReducer } from '../reducers'

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})
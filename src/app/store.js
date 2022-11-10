import { configureStore } from '@reduxjs/toolkit'

import dogsReducer from './dogListSlice'

export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
  },
})

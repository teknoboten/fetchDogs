import { configureStore } from '@reduxjs/toolkit'

import dogsReducer from '../features/dogs/dogListSlice'

export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
  },
})

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import rankDogs from './RankDogs'

const initialState = {
  dogs1: [],
  dogs2: [],
  status: 'idle',
  error: null,
}

export const fetchDogs = createAsyncThunk('dogs/fetchDogs', async () => {
  const response = await client.get('https://dog.ceo/api/breeds/list/all')
  // const response = await client.get('http://localhost:3000/dogs.json')

  const keys = Object.keys(response)
  // const doggos = []
  const dogs1 = []
  const dogs2 = []

  for (let x = 0; x < 10; x++) {
    const spliced1 = keys.splice((keys.length * Math.random()) << 0, 1)
    const spliced2 = keys.splice((keys.length * Math.random()) << 0, 1)
    dogs1.push(spliced1[0])
    dogs2.push(spliced2[0])
  }
  return { dogs1, dogs2 }
})

const dogSlice = createSlice({
  name: 'dogs',
  initialState: initialState,
  reducers: {
    updateDogs1: (state, action) => {
      // return console.log('update dog:', action.payload)
      console.log(rankDogs(state.dogs1, state.dogs2, action.payload))
      // state.dogs1 = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDogs.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchDogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // state.dogs = action.payload
        state.dogs1 = action.payload.dogs1
        state.dogs2 = action.payload.dogs2
      })
      .addCase(fetchDogs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { updateDogs1 } = dogSlice.actions

export const selectAllDogs1 = (state) => state.dogs.dogs1
export const selectAllDogs2 = (state) => state.dogs.dogs2
export const selectDogByName = (state, dogName) => {}

export const selectDog = (state) => {}
export default dogSlice.reducer

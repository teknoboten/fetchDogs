import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import rankDogs from './RankDogs'
import axios from 'axios'

const initialState = {
  dogs1: [],
  dogs2: [],
  status: 'idle',
  error: null,
}

export const fetchDogs = createAsyncThunk('dogs/fetchDogs', async () => {
  const response = await axios.get('https://dog.ceo/api/breeds/list/all')

  const keys = Object.keys(response.data.message)
  const dogs1 = []
  const dogs2 = []

  for (let x = 0; x < 10; x++) {
    const spliced = keys.splice((keys.length * Math.random()) << 0, 1)

    const dog = { id: spliced[0], dogName: spliced[0] }
    dogs1.push(dog)

    const spliced2 = keys.splice((keys.length * Math.random()) << 0, 1)
    // dogs1.push(spliced1[0])
    const dog2 = { id: spliced2[0], dogName: spliced2[0] }
    dogs2.push(dog2)
  }

  return { dogs1, dogs2 }
})

const dogSlice = createSlice({
  name: 'dogs',
  initialState: initialState,
  reducers: {
    reorderDogs: (state, action) => {
      if (action.payload.source === 'dogs1') {
        const reorderedItem = state.dogs1.filter(
          (d) => d.dogName === action.payload.dogName
        )
        const newDogs1 = state.dogs1.filter(
          (d) => d.dogName !== action.payload.dogName
        )
        newDogs1.splice(action.payload.newIndex, 0, ...reorderedItem)
        state.dogs1 = newDogs1
      }
      if (action.payload.source === 'dogs2') {
        const reorderedItem = state.dogs2.filter(
          (d) => d.dogName === action.payload.dogName
        )
        const newDogs2 = state.dogs2.filter(
          (d) => d.dogName !== action.payload.dogName
        )
        newDogs2.splice(action.payload.newIndex, 0, ...reorderedItem)
        state.dogs2 = newDogs2
      }
    },
    // updateDogs1: (state, action) => {
    //   state.dogs1 = action.payload
    // },
    // updateDogs2: (state, action) => {
    //   state.dogs2 = action.payload
    // },
    moveDogs: (state, action) => {
      if (action.payload.source === 'dogs1') {
        const reorderedItem = state.dogs1.filter(
          (d) => d.dogName === action.payload.id
        )

        const newDogs1 = state.dogs1.filter(
          (d) => d.dogName !== action.payload.id
        )
        const newDogs2 = [...state.dogs2]
        newDogs2.splice(action.payload.newIndex, 0, ...reorderedItem)
        state.dogs1 = newDogs1
        state.dogs2 = newDogs2
      }
      if (action.payload.source === 'dogs2') {
        const reorderedItem = state.dogs2.filter(
          (d) => d.dogName === action.payload.id
        )

        const newDogs2 = state.dogs2.filter(
          (d) => d.dogName !== action.payload.id
        )
        const newDogs1 = [...state.dogs1]
        newDogs1.splice(action.payload.newIndex, 0, ...reorderedItem)
        state.dogs1 = newDogs1
        state.dogs2 = newDogs2
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDogs.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchDogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.dogs1 = action.payload.dogs1
        state.dogs2 = action.payload.dogs2
      })
      .addCase(fetchDogs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { updateDogs1, updateDogs2, moveDogs, reorderDogs } =
  dogSlice.actions

export const selectAllDogs1 = (state) => state.dogs.dogs1
export const selectAllDogs2 = (state) => state.dogs.dogs2
export default dogSlice.reducer

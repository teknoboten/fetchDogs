import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import DogItem from './features/dogs/DogItem'
import DogDropSpot from './features/dogs/DogDropSpot'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import {
  selectAllDogs1,
  selectAllDogs2,
  fetchDogs,
} from './features/dogs/dogListSlice'

import DogTable from './features/dogs/DogTable'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const dogs1 = useSelector(selectAllDogs1)
  const dogs2 = useSelector(selectAllDogs2)
  const status = useSelector((state) => state.dogs.status)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDogs())
    }
  }, [status, dispatch])

  //   return (
  //     <DndProvider backend={HTML5Backend}>
  //       <Container>
  //         <DogDropSpot>
  //           <DogItem dogName="longboi" />
  //         </DogDropSpot>
  //         <DogDropSpot>
  //           <DogItem dogName="shaz" />
  //         </DogDropSpot>
  //       </Container>
  //     </DndProvider>
  //   )
  // }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        {dogs1.length ? (
          <Grid container spacing={3} justifyContent="center">
            <Grid item md={6}>
              <DogTable className="table" tableName="Breed1" dogs={dogs1} />
            </Grid>
            <Grid item md={6}>
              <DogTable className="table" tableName="Breed2" dogs={dogs2} />
            </Grid>
          </Grid>
        ) : (
          <span>no dogs here</span>
        )}
      </Container>
    </DndProvider>
  )
}

export default App

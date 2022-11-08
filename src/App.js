import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'

import {
  selectAllDogs1,
  selectAllDogs2,
  fetchDogs,
  moveDogs,
  reorderDogs,
} from './features/dogs/dogListSlice'

import ExportedDogs from './ExportedDogs'
import DogTable from './features/dogs/DogTable'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const dogs1 = useSelector(selectAllDogs1)
  const dogs2 = useSelector(selectAllDogs2)
  const status = useSelector((state) => state.dogs.status)
  const allDogs = useSelector((state) => state.dogs)
  const [exported, setExported] = useState(false)

  const toggleExported = () => setExported(!exported)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDogs())
    }
  }, [status, dispatch])

  function handleOnDragEnd(result) {
    if (!result.destination) return

    // isDogs1 && dogs1.length < 1
    //   ? console.log('')
    //   : console.log('ok you can do that')
    //check source.length < 1 "woof woof nope"

    if (result.destination.droppableId === result.source.droppableId) {
      dispatch(
        reorderDogs({
          source: result.source.droppableId,
          dogName: result.draggableId,
          newIndex: result.destination.index,
        })
      )
      return
    }

    //if source table !== dest table
    dispatch(
      moveDogs({
        id: result.draggableId,
        source: result.source.droppableId,
        newIndex: result.destination.index,
      })
    )
    return
  }

  return (
    <Container>
      {exported ? (
        <ExportedDogs dogs={allDogs} toggleDogs={toggleExported} />
      ) : (
        <Container>
          <Typography variant="h2">Fetch Doggos 🐶 </Typography>
          <Grid container spacing={3} justifyContent="center">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Grid item md={6}>
                <DogTable tableName="dogs1" dogs={dogs1} />
              </Grid>
              <Grid item md={6}>
                <DogTable tableName="dogs2" dogs={dogs2} />
              </Grid>
            </DragDropContext>
          </Grid>
          <div className="export">
            <Button
              variant="contained"
              color="secondary"
              onClick={toggleExported}
            >
              <h4>Export these Doggos</h4>
            </Button>
          </div>
        </Container>
      )}
    </Container>
  )
}

export default App

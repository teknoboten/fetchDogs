import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import Paper from '@mui/material/Paper'

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
  const [error, setError] = useState(false)
  const [disableDrag, setDisableDrag] = useState(false)

  const toggleExported = () => setExported(!exported)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDogs())
    }
  }, [status, dispatch])

  const onBeforeDragStart = (result) => {
    const source = result.source.droppableId === 'dogs1' ? dogs1 : dogs2

    if (source.length === 1) {
      setDisableDrag(true)
      setError(result.source.droppableId)
    } else {
      setDisableDrag(false)
      setError(false)
    }

    return
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const source = result.source.droppableId === 'dogs1' ? dogs1 : dogs2

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

    dispatch(
      moveDogs({
        id: result.draggableId,
        source: result.source.droppableId,
        newIndex: result.destination.index,
      })
    )
    return
  }

  const resetDrag = () => {
    setDisableDrag(false)
    setError(false)
  }

  return (
    <Container>
      {exported ? (
        <ExportedDogs dogs={allDogs} toggleDogs={toggleExported} />
      ) : (
        <Grid container alignItems="center">
          <Grid item md={12}>
            <Typography variant="h2" align="center">
              Fetch Doggos 🐶
            </Typography>
          </Grid>
          <DragDropContext
            onDragEnd={handleOnDragEnd}
            onBeforeDragStart={onBeforeDragStart}
          >
            <Grid item md={6}>
              <DogTable
                tableName="dogs1"
                dogs={dogs1}
                error={error}
                disableDrag={disableDrag}
                resetDrag={resetDrag}
              />
            </Grid>
            <Grid item md={6}>
              <DogTable
                tableName="dogs2"
                dogs={dogs2}
                error={error}
                disableDrag={disableDrag}
                resetDrag={resetDrag}
              />
            </Grid>
          </DragDropContext>

          <Grid item md={12}>
            <Paper
              sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <BottomNavigation>
                <Button
                  variant="contained"
                  // color="secondary"
                  onClick={toggleExported}
                >
                  Export these Doggos
                </Button>
              </BottomNavigation>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default App

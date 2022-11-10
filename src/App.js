import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

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
        <Grid container alignItems="space-between" sx={{ marginTop: '5vh' }}>
          <Grid item xs={12}>
            <Typography variant="h1" align="center">
              Fetch Doggos 🐶
            </Typography>

            <Box align="center" sx={{ marginY: '5vh' }}>
              <Typography variant="body1">
                Here are some dogs. Rank them if you want. When you're done:
              </Typography>
              <Button variant="text" onClick={toggleExported}>
                Export these Doggos
              </Button>
            </Box>
          </Grid>
          <DragDropContext
            onDragEnd={handleOnDragEnd}
            onBeforeDragStart={onBeforeDragStart}
          >
            <Grid item xs={12} md={6}>
              <DogTable
                tableName="dogs1"
                dogs={dogs1}
                error={error}
                disableDrag={disableDrag}
                resetDrag={resetDrag}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DogTable
                tableName="dogs2"
                dogs={dogs2}
                error={error}
                disableDrag={disableDrag}
                resetDrag={resetDrag}
              />
            </Grid>
          </DragDropContext>
          <Grid item xs={12}>
            <Box align="center" sx={{ marginY: '5vh' }}>
              <Typography variant="body1">
                This silly app was built by <Link href="">Serra Boten</Link> as
                an exercise in learning{' '}
                <Link href="https://react-redux.js.org/">Redux</Link>,{' '}
                <Link href="https://mui.com/">Material UI</Link> and{' '}
                <Link href="https://github.com/atlassian/react-beautiful-dnd">
                  React Beautiful DND
                </Link>
                . <br /> Special thanks to{' '}
                <Link href="https://dog.ceo/dog-api/">Dog CEO</Link> for the fun
                API.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default App

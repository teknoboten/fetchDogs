import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import {
  selectAllDogs1,
  selectAllDogs2,
  fetchDogs,
  updateDogs1,
  updateDogs2,
  moveDogs,
  reorderDogs,
} from './features/dogs/dogListSlice'

import ExportedDogs from './ExportedDogs'
import DogTable from './features/dogs/DogTable'
import './App.css'
import { current } from '@reduxjs/toolkit'

function App() {
  const dispatch = useDispatch()
  const dogs1 = useSelector(selectAllDogs1)
  const dogs2 = useSelector(selectAllDogs2)
  const status = useSelector((state) => state.dogs.status)
  // const allDogs = useSelector((state) => state.dogs)
  // const [exported, setExported] = useState(false)

  // const toggleExported = () => setExported(!exported)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDogs())
    }
    // console.log(dogs1)
  }, [status, dispatch])

  function handleOnDragEnd(result) {
    if (!result.destination) return
    const isDogs1 = result.destination.droppableId === 'dogs1' //destination

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

      // const items = Array.from(isDogs1 ? dogs1 : dogs2)
      // const [reorderedItem] = items.splice(result.source.index, 1)
      // items.splice(result.destination.index, 0, reorderedItem)
      // isDogs1 ? dispatch(updateDogs1(items)) : dispatch(updateDogs2(items))
      return
    }

    //if source table !== dest table
    dispatch(
      moveDogs({
        id: result.draggableId,
        source: result.source.droppableId,
        // dest: result.destination.droppableId,
        newIndex: result.destination.index,
      })
    )
    return
  }

  return (
    <div>
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
    </div>
  )
}

export default App

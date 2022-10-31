import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { selectAllDogs1, selectAllDogs2, fetchDogs } from './dogListSlice'

import DogTable from './DogTable'

const DogList = () => {
  const dispatch = useDispatch()
  // const dogs = useSelector(selectAllDogs)
  const dogs1 = useSelector(selectAllDogs1)
  const dogs2 = useSelector(selectAllDogs2)
  const status = useSelector((state) => state.dogs.status)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDogs())
    }
  }, [status, dispatch])

  return (
    <Container>
      {dogs1.length ? (
        // <div className="dogList">

        <Grid container spacing={3} justifyContent="center">
          <Grid item md={6}>
            <DogTable className="table" tableName="Breed 1" dogs={dogs1} />
          </Grid>
          <Grid item md={6}>
            {/* <DogTable
              className="table"
              tableName="Breed 2"
              dogs={dogs.slice(5, 9)}
            /> */}
            <DogTable className="table" tableName="Breed 2" dogs={dogs2} />
          </Grid>
        </Grid>
      ) : (
        <span>no dogs here</span>
      )}
    </Container>
  )
}

export default DogList

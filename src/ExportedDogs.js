import React from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import exportDogs from './helpers/exportDogs'

export default function ExportedDogs({ dogs, toggleDogs }) {
  const dogBreeds = exportDogs(dogs)

  console.log(dogBreeds)
  return (
    <Container>
      <div>{dogBreeds}</div>
      <Button size="large" onClick={toggleDogs}>
        Rank More Dogs
      </Button>
    </Container>
  )
}

import React from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

export default function ExportedDogs({ dogs, toggleDogs }) {
  const dogBreeds = JSON.stringify(dogs)

  return (
<Container>
  <div>
    {dogBreeds}
  </div>
  <Button size="large" onClick={toggleDogs}>Rank More Dogs</Button>
  </Container>
  )
}

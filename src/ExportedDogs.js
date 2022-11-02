import React from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import exportDogs from './exportDogs'

export default function ExportedDogs({ dogs, toggleDogs }) {
  const dogBreeds = exportDogs(dogs)
  // const dogBreeds = JSON.stringify(dogs)

  console.log(dogBreeds)
  return (
<Container>
  <div>
    {dogBreeds}
  </div>
  <Button size="large" onClick={toggleDogs}>Rank More Dogs</Button>
  </Container>
  )
}

import React from 'react'
import Button from '@mui/material/Button'

export default function DogItem({ dogName, currentRank, currentTable }) {


  return (
        <Button variant="text" size="small">
          {dogName}
        </Button>
  )
}

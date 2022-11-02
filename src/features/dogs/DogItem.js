import React from 'react'
import Button from '@mui/material/Button'
import { ItemTypes } from '../../ItemTypes'
import { useDrag } from 'react-dnd'

export default function DogItem({ dogName, currentRank, currentTable }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.DOG,
    item: { dogName, currentRank, currentTable },
    // end: () => dispatch(updateDogs1({ dogName, rank, currentTable })),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      getItem: monitor.getItem(),
    }),
  }))

  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div ref={drag}>
        <Button variant="text" size="small">
          {dogName}
        </Button>
      </div>
    </div>
  )
}

import React from 'react'
import Button from '@mui/material/Button'
import { ItemTypes } from '../../ItemTypes'
import { useDrag } from 'react-dnd'

export default function DogItem({ dogName, currentRank, currentTable }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.DOG,
    item: { dogName, currentRank, currentTable },
    // options: { dropEffect: 'move ' },
    end: () => console.log('this is the end of dogitem!'), //call a thing here
    // end: () => dispatch(updateDogs1({ dogName, rank, currentTable })),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      getItem: monitor.getItem(),
    }),
  }))

  return (
    /* This is optional. The dragPreview will be attached to the dragSource by default */
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {/* The drag ref marks this node as being the "pick-up" node */}
      <div ref={drag}>
        <Button variant="text" size="small">
          {dogName}
        </Button>
      </div>
    </div>
  )
}

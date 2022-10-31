import React from 'react'
import Button from '@mui/material/Button'
import { ItemTypes } from '../../ItemTypes'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { updateDogs1 } from './dogListSlice'

export default function DogItem({ dogName, currentRank, currentTable }) {
  const dispatch = useDispatch()
  const [{ isDragging, getItem }, drag, dragPreview] = useDrag(() => ({
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
      <div role="Handle" ref={drag}>
        <Button variant="outline" size="small">
          {dogName}
        </Button>
      </div>
    </div>
  )
}

//   return collected.isDragging ? (
//     <div ref={dragPreview} />
//   ) : (
//     <div ref={drag} {...collected}>
//       <Button variant="text" size="small">
//         {dogName}
//       </Button>
//     </div>
//   )
// }

// export default function DogItem({ dogName }) {
//   const [collected, drag, dragPreview] = useDrag(() => ({
//     type: ItemTypes.DOG,
//     item: { dogName },
//   }))

//   return collected.isDragging ? (
//     <div ref={dragPreview} />
//   ) : (
//     <div ref={drag} {...collected}>
//       <Button variant="text" size="small">
//         {dogName}
//       </Button>
//     </div>
//   )
// }

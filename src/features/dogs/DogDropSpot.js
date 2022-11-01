import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../ItemTypes.js'
import DogItem from './DogItem.js'
import { useDispatch } from 'react-redux'
import { updateDogs1 } from './dogListSlice.js'

export default function DogDropSpot({ rank, dogName, tableName, children }) {
  const dispatch = useDispatch()
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: ItemTypes.DOG,
    // end: () => dispatch(updateDogs1({ dogName, rank, currentTable })),
    drop: () => dispatch(updateDogs1({ dogName, rank, tableName })),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      dogName,
      rank,
      tableName,
      getItem: monitor.getItem(),
    }),
  }))

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'black' : 'white' }}>
      {/* {canDrop ? 'Release to drop' : children} */}
      {/* {children} */}
      <DogItem dogName={dogName} currentRank={rank} currentTable={tableName} />
    </div>
  )
}

// const [collectedProps, drop] = useDrop(() => ({
//   accept: ItemTypes.DOG,
//   drop: () => updateRank(),
//   collect: (monitor) => ({
//     isOver: !!monitor.isOver(),
//   }),
// }))

//   return <div ref={drop}>{children}</div>
// }

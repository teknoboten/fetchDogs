import * as React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function DogTable({ dogs, tableName }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="right">Breed</TableCell>
          </TableRow>
        </TableHead>
        <Droppable droppableId={tableName}>
          {(provided) => (
            <TableBody {...provided.droppableProps} ref={provided.innerRef}>
              {dogs.map(({ id, dogName }, index) => {
                return (
                  <TableRow
                    key={index + 1}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <Draggable
                      key={dogName}
                      draggableId={dogName}
                      index={index}
                    >
                      {(provided) => (
                        <TableCell
                          // align="right"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {dogName}
                        </TableCell>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </TableRow>
                )
              })}
              {/* {provided.placeholder} */}
            </TableBody>
          )}
        </Droppable>
      </Table>
    </TableContainer>
  )
}

{
  /* <TableCell align="right">
<div
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
>
  {dogName}
</div>
</TableCell> */
}

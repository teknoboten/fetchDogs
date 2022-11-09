import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

export default function DogTable({
  dogs,
  tableName,
  error,
  disableDrag,
  resetDrag,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="right">Breed</TableCell>
          </TableRow>
        </TableHead>
        <Droppable droppableId={tableName} isDropDisabled={disableDrag}>
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
                      isDragDisabled={disableDrag}
                    >
                      {(provided) => (
                        <TableCell
                          align="right"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {error && error === tableName ? (
                            <Alert onClose={() => resetDrag()} severity="error">
                              Woof Woof not allowed
                            </Alert>
                          ) : (
                            dogName
                          )}
                        </TableCell>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </TableRow>
                )
              })}
            </TableBody>
          )}
        </Droppable>
      </Table>
    </TableContainer>
  )
}

import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import TableHead from '@mui/material/TableHead'
import { Typography } from '@mui/material'

export default function DogTable({
  dogs,
  tableName,
  error,
  disableDrag,
  resetDrag,
}) {
  return (
    <TableContainer sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h4" align="center">
                {tableName === 'dogs1' ? 'Dogs 1' : 'Dogs2'}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <Droppable droppableId={tableName} isDropDisabled={disableDrag}>
          {(provided, snapshot) => (
            <TableBody
              sx={{ bgcolor: '#4dd0e1' }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {dogs.map(({ id, dogName }, index) => {
                return (
                  <TableRow
                    key={index + 1}
                    sx={{
                      bgcolor: snapshot.isDraggingOver ? '#00acc1' : '#4dd0e1',
                    }}
                  >
                    <Draggable
                      key={dogName}
                      draggableId={dogName}
                      index={index}
                      isDragDisabled={disableDrag}
                    >
                      {(provided, snapshot) => (
                        <TableCell
                          sx={{
                            borderBottom: 0,
                            width: '100%',
                          }}
                          align="center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {error && error === tableName ? (
                            <Alert onClose={() => resetDrag()} severity="error">
                              Woof Woof not allowed
                            </Alert>
                          ) : (
                            <Paper
                              sx={{
                                fontSize: '1.2rem',
                                height: 50,
                                lineHeight: '50px',
                                textAlign: 'center',
                              }}
                              elevation={2}
                            >
                              {dogName}
                            </Paper>
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

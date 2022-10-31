import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import DogItem from './DogItem'
import DogDropSpot from './DogDropSpot'

export default function DogTable({ dogs, tableName }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="right">Breed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dogs.map((d, index) => (
            <TableRow
              // rank={index + 1}
              key={index + 1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">
                <DogDropSpot dogName={d} rank={index + 1} tableName={tableName}>
                  {/* <DogItem dogName={d} /> */}
                </DogDropSpot>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

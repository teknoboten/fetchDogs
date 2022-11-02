import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import {
  selectAllDogs1,
  selectAllDogs2,
  fetchDogs,
} from './features/dogs/dogListSlice'

import ExportedDogs from './ExportedDogs'
import DogTable from './features/dogs/DogTable'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const dogs1 = useSelector(selectAllDogs1)
  const dogs2 = useSelector(selectAllDogs2)
  const status = useSelector((state) => state.dogs.status)
  const allDogs = useSelector((state) => state.dogs)
  const [exported, setExported] = useState(false)

  const toggleExported = () => setExported(!exported)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDogs())
    }
  }, [status, dispatch])

  // const dogs = useSelector((state) => state.dogs)

  return (
    <Container>
      {exported ? (
        <ExportedDogs dogs={allDogs} toggleDogs={toggleExported} exported={exported}/>
      ) : (
        <Container>
          <DndProvider backend={HTML5Backend}>
            {dogs1.length ? (
              <Grid container spacing={3} justifyContent="center">
                <Grid item md={6}>
                  <DogTable tableName="Breed1" dogs={dogs1} />
                </Grid>
                <Grid item md={6}>
                  <DogTable className="table" tableName="Breed2" dogs={dogs2} />
                </Grid>
              </Grid>
            ) : (
              <span>no dogs here 🐶 </span>
            )}
          </DndProvider>
          <Button size="large" onClick={toggleExported}>
            Export Dogs
          </Button>
        </Container>
      )}
      {/* <Container>
        {exported ? (
          <ExportedDogs dogs={allDogs} />
        ) : (
          <Button size="large" onClick={exportDogs}>
            Export Dogs
          </Button>
        )}
      </Container> */}
    </Container>
  )
}

export default App

// return (
//   <DndProvider backend={HTML5Backend}>
//     <Container>
//       {dogs1.length ? (
//         <Grid container spacing={3} justifyContent="center">
//           <Grid item md={6}>
//             <DogTable tableName="Breed1" dogs={dogs1} />
//           </Grid>
//           <Grid item md={6}>
//             <DogTable className="table" tableName="Breed2" dogs={dogs2} />
//           </Grid>
//         </Grid>
//       ) : (
//         <span>no dogs here 🐶 </span>
//       )}
//     </Container>
//     <Container>
//       {exported ? (
//         <ExportedDogs dogs={allDogs} />
//       ) : (
//         <Button size="large" onClick={exportDogs}>
//           Export Dogs
//         </Button>
//       )}
//     </Container>
//   </DndProvider>
// )
// }

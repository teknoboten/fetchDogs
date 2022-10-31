const updateRank = () => {
  //select existing dogs... propbably something memoizzzzed or whatever
  //do the math and return
  //also maybe we only call this if there's a changed
  console.log('can we update this already????')
  const newDogs = ['updated', 'dogs', 'fml', 'woof', 'etc']
  return newDogs
}

export default updateRank

// let knightPosition = [0, 0]
// let observer = null

// function emitChange() {
//   observer(knightPosition)
// }

// export function observe(o) {
//   if (observer) {
//     throw new Error('Multiple observers not implemented.')
//   }

//   observer = o
//   emitChange()
// }

// export function moveKnight(toX, toY) {
//   knightPosition = [toX, toY]
//   emitChange()
// }

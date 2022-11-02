// const dogs = {
//   dogs1: [
//     'pug',
//     'segugio',
//     'stbernard',
//     'lhasa',
//     'tervuren',
//   ],
//   dogs2: [
//     'eskimo',
//     'corgi',
//     'dingo',
//     'mexicanhairless',
//     'pinscher',
//   ],
//   status: 'succeeded',
//   error: null,
// }

const exportDogs = (dogs) => {
//this function is very ugly but i am very tired :cry:
const makeBreed1 = () => {
  const breed1Rank = {}
  dogs.dogs1.forEach((dog, index) => {
      breed1Rank[`rank${index+1}`] = dog
    })
  return breed1Rank
  }

  const makeBreed2 = () => {
    const breed2Rank = {}
    dogs.dogs2.forEach((dog, index) => {
        breed2Rank[`rank${index+1}`] = dog
      })
    return breed2Rank
    }

  const result = {
    "dogBreeds": {
      "breed1Total": dogs.dogs1.length,
      "breed1Rank": makeBreed1(),
      "breed2Total": dogs.dogs2.length,
      "breed2Rank": makeBreed2(),
  }
}

  // return result;
  return JSON.stringify(result)
}

// exportDogs(dogs)

module.exports = exportDogs


const dogs = {
  dogs1: [
    'pug',
    'segugio',
    'stbernard',
    'lhasa',
    'tervuren',
    'pitbull',
    'cockapoo',
    'ridgeback',
    'puggle',
    'chow',
  ],
  dogs2: [
    'eskimo',
    'corgi',
    'dingo',
    'mexicanhairless',
    'pinscher',
    'akita',
    'collie',
    'whippet',
    'basenji',
    'setter',
  ],
  status: 'succeeded',
  error: null,
}

const exportDogs = (dogs) => {
  // const result = {
  //   "dogBreeds": {
  //     "breed1Total": dogs.dogs1.length,
  //     "breed1Rank": {

  //     }
  //   }
  // }

  // return result;
  return JSON.stringify(dogs)
}

module.exports = exportDogs

const exportDogs = require('./exportDogs')

const dogs = {
  dogs1: [
    'pug',
    'segugio',
    'stbernard',
    'lhasa',
    'tervuren',

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

const result = {
"dogBreeds": {
  "breed1Total": 5,
  "breed1Rank": {
    "rank1": "pug",
    "rank2": "segugio",
    "rank3": "stbernard",
    "rank4": "lhasa",
    "rank5": "tervuren",

  },
  "breed2Total": 5,
  "breed2Rank": {
    "rank1": "eskimo",
    "rank2": "corgi",
    "rank3": "dingo",
    "rank4": "mexicanhairless",
    "rank5": "pinscher",
} 
}}

test('returns a value', () => {
  expect(exportDogs(dogs)).toBeDefined()
})

test('to return an object', () => {
  expect(exportDogs(dogs)).toEqual(result)
})

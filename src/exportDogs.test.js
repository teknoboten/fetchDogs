const exportDogs = require('./exportDogs')

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

const result = {
"dogBreeds": {
  "breed1Total": 10,
  "breed1Rank": {
    "rank1": "appenzeller",
    "rank2": "kelpie",
    "rank3": "waterdog",
    "rank4": "doberman",
    "rank5": "shihtzu",
    "rank6": "collie",
    "rank7": "saluki",
    "rank8": "vizsla",
    "rank9": "otterhound",
    "rank10": "brabancon"
  },
  "breed2Total": 10,
  "breed2Rank": {
    "rank1": "ovcharka",
    "rank2": "dachshund",
    "rank3": "mix",
    "rank4": "affenpinscher",
    "rank5": "labrador",
    "rank6": "setter",
    "rank7": "african",
    "rank8": "spaniel",
    "rank9": "pointer",
    "rank10": "greyhound"
} 
}}

test('returns a value', () => {
  expect(exportDogs(dogs)).toBeDefined()
})

test('to return an object', () => {
  expect(exportDogs(dogs)).toEqual(result)
})

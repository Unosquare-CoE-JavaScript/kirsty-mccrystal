
//alias/custom types
type Combinable = number | string
type Conversion = 'as-text' | 'as-number'

//Union types - except more than one type
function combine(
  input1: Combinable, 
  input2: Combinable, 
  conversion: Conversion // literal types - set an exact value
) {
  let results

  if (typeof input1 === 'number' && typeof input2 === 'number') {
    results = input1 + input2;
  } else { 
    results = input1.toString() + input2.toString()
  }

  return results
}

const combineAge = combine(10, 2, 'as-number'); 
const combineNames = combine('kirsty', 'phillip', 'as-text')
const createError = combine('kirsty', 'phillip', 'not-available') // ERROR!! not part of literial types
function add(num1: number, num2: number, printResults: boolean, printMessage: string) {
  // Must be a number to add and not a string
  let results = num1 + num2

  if (showResults) {
    console.log(`${message}${results}`)
  } else {
    results
  }
}

const number1 = '10'
let number2:number // Can define a type here, if no assignment
number2 = '5' //Will throw an error cause it's not a number but a string
const showResults = true
const message = 'Result is:' // TypeScript automatically sets a type when value is assigned ( type inferance )

add(number1, number2, showResults, message) //number1 variable will throw an error cause it set as a string
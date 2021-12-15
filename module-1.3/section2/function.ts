function add(n1: number, n2: number) {
  return n1 + n2;
}

// Setting Return types
function printResult(num): void {
  console.log(`Result is ${num}`)
}

//Void type doesn’t require a return but undefined type does. That's the key difference!! 
function print(num): undefined {
  console.log(`Result is ${num}`)
  return
}

// Function Type and Callback
function addAndHandler(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result)
}

printResult(add(1, 2))

//Function type
let combineValues: (a:number, b:number) => number;

combineValues = add
combineValues = printResult; //This errors because it only has one arguments and returns nothing

console.log(combineValues(1, 1));

addAndHandler(1, 2, (result) => {
  console.log(result)
})
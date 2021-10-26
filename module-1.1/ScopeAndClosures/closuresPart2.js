function toggle(...toggleValues) {

  let currentStep = 1
  let currentValue = {}

  // function has access to outer scope variable without declaring it inside function scope. This is closure!!
  /**
   * Closure - When a function remembers and continues to have access to variables outside it's scope,
   *           even when the function is excuted in a different scope.
   */
  return function nextValue () {
    // Reset currentStep if it's longer than toggle values length
    if (currentStep > toggleValues.length) {
      currentStep = 1
    }

    if (currentStep === 1) {
      currentValue = toggleValues[currentStep - 1]
      currentStep = ++currentStep

      return currentValue
    }

    if (currentStep > 1) {
      currentValue = toggleValues[currentStep - 1]
      currentStep = ++currentStep
  
      return currentValue
    }
  }
}

var hello = toggle("hello");
var onOff = toggle("on","off");
var speed = toggle("slow","medium","fast");


console.log(hello())

console.log(onOff())
console.log(onOff())
console.log(onOff())
console.log(onOff())
console.log(onOff())

console.log(speed())
console.log(speed())
console.log(speed())
console.log(speed())
console.log(speed())

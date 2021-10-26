
function useCalc(calc,keys) {
  var keyMappings = {
    "+":"plus",
    "-":"minus",
    "*":"mult",
    "/":"div",
    "=":"eq"
  };
  
  return [...keys].reduce(function showDisplay(display,key) {
    var fn = keyMappings[key]||"number";
    var ret = String( calc[fn](key) );
    
    return (
      display + (( ret!= "" && key == "=" ) ? "=" : "" ) + ret 
    ); 
  }, "");
}

function formatTotal(display) { 
  if ( Number.isFinite(display) ) {
    // constrain display to max 11 chars 
    let maxDigits = 11; 
    // reserve space for "e+" notation?
    if ( Math.abs(display)>99999999999 ) {
      maxDigits-=6;
    }
    // reserve space for "-"?
    if ( display < 0 ) {
      maxDigits--;
    }
    // whole number? 
    if ( Number.isInteger(display) ) {
      display = display
       .toPrecision(maxDigits)
       .replace(/\.0+$/,"");
    }
    // decimal
    else {
      // reserve space for "." 
      maxDigits--;
      // reserve space for leading "0"?
      if ( Math.abs(display ) >= 0 && Math.abs(display) <1 ) {
        maxDigits--;
      }
      display = display
        .toPrecision(maxDigits)
        .replace(/0+$/,"");
      }
    } else {
      display = "ERR"
    }

  return display;
}

// Above functions are taken from YDKJSY Scope & Closures - main aim of this example is to work on the memory of closure 

function calculator() {
  // these alway holds the memory of closure on each new instance of calculator. Because these variables are being accessed from a nested function.
  let total = 0
  let currentVal = []
  let currentOperater = null

  var publicAPI = {
    number,
    plus,
    minus,
    mult,
    div,
    eq
  }

  return publicAPI

  function number (key) {    
    currentVal.push(key)
  }

  function plus () {
    runOperator("+")
  }

  function minus () {
    runOperator("-")
  }

  function mult () {
    runOperator("*")
  }

  function div () {
    runOperator("/")
  }

  function runOperator (operator) {
    if (currentVal.length !== 0 && currentOperater !== "=" && currentOperater !== null) {
      total = calculate(Number(total), operator, Number(currentVal.join('')))
    }
    
    else if (currentVal.length !== 0) {
      total = currentVal.join('')
    }

    currentOperater = operator
    currentVal = []
  }

  function eq () {
    if (currentOperater !== "=") {
      total = calculate(total, currentOperater, currentVal.join(''))
      currentVal = []
      currentOperater = "="
    }

    return console.log(formatTotal(total))
  }

  function calculate (n1, operator, n2) {
    n1 = Number(n1)
    n2 = Number(n2)

    if (operator === '+') {
      return n1 + n2
    }
    if (operator === '-') {
      return n1 - n2
    }
    if (operator === '/') {
      return n1 / n2
    }
    if (operator === '*') {
      return n1 * n2
    }
  }
}

var calc = calculator()

calc.number("4"); // 4
calc.plus();// +
calc.number("3");// 3
calc.eq();

calc.plus();
calc.number("9");
calc.eq();

calc.mult()
calc.number("8")
calc.eq()

calc.number("7")
calc.mult()
calc.number("2")
calc.mult()
calc.number("3")
calc.eq()

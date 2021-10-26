
function useCalc(calc,keys) {
  return[...keys].reduce(
    function showDisplay(display,key) {
      var ret = String( calc(key) );
      return ( 
        display+ 
        (
          (ret != "" && key == "=" ) ? 
            "=" : 
            "" 
        ) + 
        ret 
      );
    },
    ""
  );
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
  let currentVal = ""
  let currentOperater = null

  return function getCalculation(key) {

    //Key
    if (/^\d+$/.test(key)) {
      currentVal += key
      return key
    }

    //Operator
    if (/[+*/-]/.test(key)) {
      if (currentVal !== '' && currentOperater !== "=" && currentOperater !== null) {
        total = calculate(total, currentOperater, currentVal)
      }

      else if (currentVal !== '') {
        total = currentVal
      }

      currentOperater = key
      currentVal = ''
      return key
    }

    if (key === '=' && currentOperater !== "=") {
      total = calculate(total, currentOperater, currentVal)
      currentOperater = key
      currentVal = ''
  
      return console.log(formatTotal(total))
    }

    return ""  
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


useCalc(calc,"4+3="); // 4+3=7
useCalc(calc,"+9="); // +9=16
useCalc(calc,"*8="); // *8=128
useCalc(calc,"7*2*3="); // 7*2*3=42
useCalc(calc,"1/0="); // 1/0=ERR
useCalc(calc,"+3="); // +3=ERR
useCalc(calc,"51="); // 51
// Visitor pattern

// Do not modify the hierarchy or do not
// Need access to non-common aspects of classes
// Create an external component to help handle this
   // helps to avoid explicit type checks
// a component ( visitor ) that knows how to traverse a data structur
// composed of types

// Intrusive visitor
class NumberExpression {
  constructor(value) {
    this.value = value
  }

  accept(visitor) {
    visitor.visitNumber(this)
  }

  // print(buffer) {
  //   buffer.push(this.value.toString())
  // }
}

class AddExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  // print(buffer) {
  //   buffer.push('(')
  //   this.left.print(buffer)
  //   buffer.push('+')
  //   this.right.print(buffer)
  //   buffer.push(')')
  // }

  accept(visitor) {
    visitor.visitAddition(this);
  }
}

class Visitor {
  constructor() {
    this.buffer = [];
  }
  // visitNumber(e) {}
  // visitAddition(e) {}
}

class Printer extends Visitor {
  constructor() {
    super();
  }

  visitNumber(e) {
    this.buffer.push(e.value)
  }

  visitAddition(e) {
    this.buffer.push('(')
    e.left.accept(this)
    this.buffer.push('+')
    e.right.accept(this);
    this.buffer.push(')')
  }

  toString() {
    return this.buffer.join('')
  }
}

// Reflective visitors
// class Printer {
//   print(e, buffer) {
//     if ( e instanceof NumberExpression) {
//       buffer.push(e.value)
//     }
//     else if ( e instanceof AddExpression) {
//       buffer.push('(')
//       this.print(e.left, buffer)
//       buffer.push('+')
//       this.print(e.right, buffer)
//       buffer.push(')')
//     }
//   }
// }

class ExpressionCalculator extends Visitor {
  constructor() {
    super();
    this.result = 0;
  }

  visitNumber(e) {
    this.result = e.value;
  }

  visitAddition(e) {
    e.left.accept(this);
    let temp = this.result
    e.right.accept(this)
    this.result += temp;
  }
}

let e = new AddExpression(
  new NumberExpression(1),
  new AddExpression(
    new NumberExpression(2),
    new NumberExpression(3)
  )
)

//let buffer = [];
let ep = new Printer()
ep.visitAddition(e) // Classic visitor
//ep.print(e, buffer) // // Reflective visitors
//e.print(buffer) // buffer is the visitor
//console.log(buffer.join(''))
console.log(ep.toString())

let ec = new ExpressionCalculator()
ec.visitAddition(e);

console.log(`${ep.toString()} = ${ec.result}`)


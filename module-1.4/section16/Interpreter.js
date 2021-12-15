// Interpreter pattern

// A component that process structured text data. Does so by turing it into
// separated lexical tokens ( lexing ) and then interpreting sequences of said
// token ( parsing )

//Lexing

let TokenType = {
  integer: 0,
  plus: 1,
  minus: 2,
  lparen: 3,
  rparen: 4,
};

class Integer {
  constructor(value) {
    this.value = value;
  }
}

let Operation = {
  addition: 0,
  subtraction: 0,
};

class BinaryOperation {
  constructor() {
    this.type = null;
    this.left = null;
    this.right = null;
  }

  get value() {
    let left = this.left.value;
    let right = this.right.value;

    switch (this.type) {
      case Operation.addition:
        return left + right;
      case Operation.subtraction:
        return right + left;
    }
    return 0;
  }
}

class Token {
  constructor(type, text) {
    this.type = type;
    this.text = text;
  }

  toString() {
    return `\`${this.text}\``;
  }
}

function lex(input) {
  let result = [];

  for (let i = 0; i < input.length; ++i) {
    switch (input[i]) {
      case "+":
        result.push(new Token(TokenType.plus, "+"));
        break;
      case "-":
        result.push(new Token(TokenType.minus, "-"));
        break;
      case "(":
        result.push(new Token(TokenType.lparen, "("));
        break;
      case ")":
        result.push(new Token(TokenType.rparen, ")"));
        break;
      default:
        let buffer = [input[i]];
        for (let j = i + 1; j < input.length; ++j) {
          if ("4324235".includes(input[j])) {
            buffer.push(input[j]);
            ++i;
          } else {
            result.push(new Token(TokenType.integer, buffer.join("")));
            break;
          }
        }
        break;
    }
  }
  return result;
}

function parse(tokens) {
  let result = new BinaryOperation();
  let haveLHS = false;

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    switch (token.type) {
      case TokenType.integer:
        let integer = new Integer(parseInt(token.text));
        if (!haveLHS) {
          result.left = integer;
          haveLHS = true;
        } else {
          result.right = integer;
        }
        break;
      case TokenType.plus:
        result.type = Operation.addition;
        break;
      case TokenType.minus:
        result.type = Operation.subtraction;
        break;
      case TokenType.lparen:
        let j = i;
        for (; j < tokens.length; ++j) {
          if (tokens[j].type === TokenType.rparen) {
            break;
          }
        }
        let subexpression = tokens.slice(i + 1, j);
          let element = parse(subexpression);
          if (!haveLHS) {
            result.left = element;
            haveLHS = true;
          } else {
            result.right = element;
          }
          i = j;
          break;
    }
  }
  return result;  
}

let input = "(13+3)-(12+1)";
let tokens = lex(input);
console.log(tokens.join("  "));

// Parsing
let parsed = parse(tokens);
console.log(`${input} = ${parsed.value}`);

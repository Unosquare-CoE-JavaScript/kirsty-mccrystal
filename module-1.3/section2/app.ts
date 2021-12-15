// The Unknown type - more restriction than any type, might need extra type check.
// better choice over any
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'test';

userName = userInput; //Error cause of type unknown is trying to be assigned to string type

// Here we can definitely check if userInput is a string 
if (typeof userInput === 'string') {
  userName = userInput
}

// The Never type - function is intended to never return anything
function produceError(message: string, code: number): never {
  throw {message: message, errorCode: code}
}

produceError('An error occurred:', 500)
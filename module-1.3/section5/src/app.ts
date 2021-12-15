
// An interface describes the structure of an object
// Can only be used to describe a structure of an object, type can store other things like union
// Can be used as a contract for the class to adhere to

// can also be used to define a function as well

//type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string; // can't assign a new value
  outputName?: string; // Optional property (?): might exist in object
}

// can inherit the Named interface to check for name property
// can merge more than one but can only do it once for classes
interface Greetable extends Named {
  greet(phrase: string): void;
}

// Person class must adhere to Greetable interface
class Person implements Greetable {
  name?: string; // Optional (?)
  age = 28;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    } else {
      this.name = 'no name provided'
    }
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name)
  }
}

// Whatever is stored in user 1 has to match Greetable
let user1: Greetable;

user1 = new Person();

user1.greet('Hi my name is')
console.log(user1)
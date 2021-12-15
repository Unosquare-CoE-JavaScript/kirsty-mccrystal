//ENUM
enum Role {ADMIN, TESTER, DEVELOPER}

const person: {
  name: string;
  age: number;
  hobbies: string[]; // type should an array of strings
  birthMonYear: [number, string]; // define a tuple type
  role: Role
 } = {
  name: 'kirsty',
  age: 28,
  hobbies: ['cooking', 'sports'], //will error if any other types are added, i.e a number
  birthMonYear: [3, '1993'],
  role: Role.ADMIN
}

person.birthMonYear[1] = 10 // Has to be a string!!
person.birthMonYear = [5, 'next', 'not allowed!!'] // max length of 2

//Can explicitly set a type
let favouriteCars: string[]
favouriteCars = ['Ford', 'Vauxhall', 10] //10 will error cause it's a number, not a string

for(const hobby of person.hobbies) {
  console.log(hobby.toUpperCase())
  console.log(hobby.map()) //!! Can't do this, TS will show error dictating a string can't use map()! 
}
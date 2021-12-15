// intersection types

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee; // Instersection tyeps (&)

const e1: ElevatedEmployee = {
  name: 'Kirsty',
  privileges: ['Update permissions'],
  startDate: new Date()
}

type Combine = string | number;
type Num = number | boolean;

type uni = Combine & Num; // Instersection types (&)

// -- Function Overload --
// Merges wiht function below telling it we can get a number
function add(n1: number, n2: number): number;
function add(n1: string, n2: string): string;

// -- Type Guards --
function add(n1: Combine, n2: Combine) {
  // This is a type guard using typeof!!
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}

// -- Function Overload --
const result = add('Kirsty', 'Mcc')
result.split(' ')

// -- Optional chaining --
const fetchUserData = {
  id: 'u1',
  name: 'Kirsty',
  job: { title: 'CEO', description: 'I run the company'}
}

console.log(fetchUserData?.job?.title);

// -- Nullish coalescing ---

const nullTest = '';
const data = nullTest ?? 'TEST';

console.log('data', data);

type unknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: unknownEmployee) {
  console.log('name' + emp.name)

  // Type Guard
  if ('privileges' in emp) {
    console.log('priv' + emp.privileges) // only comes from Admin
  }
  if ('startDate' in emp) {
    console.log('date' + emp.startDate) // only comes from Admin
  }
}

printEmployeeInfo(e1);

class Car {
  drive() {
    console.log('the car is driving ')
  }
}

class Truck {
  drive() {
    console.log('the truck is driving')
  }

  loadCargo(amount: number) {
    console.log('loading cargo' + amount)
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  //Type Guard
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(300);
  }
}

useVehicle(v1)
useVehicle(v2)

// Discriminated Unions - special type gaurd
// a pattern we can use with unions and object types

interface Bird {
  type: 'bird'; // Literal type
  flyingSpeed: number;

}

interface Horse {
  type: 'horse'; // can use a prop to check
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;

  switch(animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;

  }
  console.log('speed' + speed)
}

moveAnimal({ type: 'bird', flyingSpeed: 80 })
moveAnimal({ type: 'horse', runningSpeed: 100 })


//Type Casting - helps you to tell TS that some value is of a specfic type.
// Dev knows but TS doesn't. We tell TS the type.

//(!) - tells TS it will never return null.

// Type Casting version 1 (<>)
//const userInput = <HTMLInputElement>document.getElementById('testing-input')!;

// Type Casting version 2 - good for React projects - <> collides with React
const userInput = document.getElementById('testing-input')! as HTMLInputElement;

// If unsure it won't return null
// if (userInput) {
//   (userInput as HTMLInputElement).value = 'Hi!'
// }

userInput.value = 'Hi!'

// ---- Index Types ---

// Flexiable - not restrictive on prop name, can be any name
interface ErrorContainer {
  [key: string]: string
}

const error: ErrorContainer = {
  email: 'not a valid email!',
  userName: 'Must be length of more than 1'
};


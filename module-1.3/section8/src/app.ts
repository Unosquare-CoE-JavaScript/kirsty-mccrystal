// -- Decorators -- ( useful for meta programming )
// --- suited for making it easier for other developers

// Decorator - Factory function
function Logger(logString: string) {
  console.log('LOGGER FACT')
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACT')
  return function<T extends {new(...args: any[]): {name: string}}>(orgConstructor: T) {
    return class extends orgConstructor {
      constructor(..._: any[]) {
        super();
        console.log('rendering Template...')
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    }
  }
}

//@Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('<h1>Person</h1>', 'app')
class Person {
  name = 'Kirsty'

  constructor() {
    console.log('Creating...')
  }
}

const pers = new Person();

console.log(pers);

// ----

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property dec!');
  console.log(target, propertyName)
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor dec');
  console.log(target);
  console.log(name);
  console.log(descriptor); 
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method dec');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter dec');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log //Property decorator
  title: string;
  private _price: number;

  @Log2 //Accessor decortor
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid')
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3 //Method decortor
  getPriceWithTax(@Log4 tax: number) { // Parameter decorator
    return this._price * (1 + tax);
  }
}

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const orgMethod = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = orgMethod.bind(this); //Always referred to the object it belongs to.
      return boundFn;
    }
  };
  return newDescriptor;
}

class Printer {
  message = 'This Works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

// --- Decorators for validation

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
  }
}

function PostiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
  }
}

function validate(obj: any) {
  const objValidator = registeredValidators[obj.constructor.name];
  if (!objValidator) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidator) {
    for (const validator of objValidator[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PostiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEL = document.getElementById('title') as HTMLInputElement;
  const priceEL = document.getElementById('price') as HTMLInputElement;

  const title = titleEL.value;
  const price = +priceEL.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert('Invalid input');
    return;
  }
  console.log(createdCourse);
})



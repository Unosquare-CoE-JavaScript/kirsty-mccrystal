// -- Generics types -- 
// A type contected to another type ( Array<string> )

const names: Array<string> = ['Kirsty', 'McCrystal'] // the same as string[]
names[0].split(' ');

// Also a generic type ( Promise<string> )
const promise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve('done!');
  }, 2000)
});

promise.then(data => {
  data.split(' ');
})

// -- Generic Functions --
// Returns the intersection, can by any type, flexiable

// --  Working with constriants --
// Can set constriants to set what type should be used for generic functions
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// Has to pass an object into para
const mergedObj = merge({ name: 'Kirsty' }, { age: 28 });
console.log(mergedObj);


// -- More Generic Function --

interface Length {
  length: number
}

// Example here only cares that we have a length property. For example passing number will show error.
function countAndPrint<T extends Length>(data: T): [T, string] {
  let print = 'Got nothing!';
  if (data.length > 0) {
    print = `Got ${data.length}`
  } else if (data.length === 1) {
    print = `Only have ${data.length}`
  }
  return [data, print];
}

console.log(countAndPrint(['test', 'test']))

// -- The keyof Constriants --
// Nice way of letting TS know we want to make sure the key is there in object
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

console.log(extractAndConvert({name: 'Kirsty'}, 'name'))
// if we passed another key name, for example age then it will error.
// because it's not defined in the object we passed in.

// -- Generic class --

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStore = new DataStorage<string>();
textStore.addItem('Max');
textStore.addItem('Kirsty');
textStore.removeItem('Max');
console.log(textStore.getItems())

const numStore = new DataStorage<number>();

// Will error cause we only accept primitive types
// const objStore = new DataStorage<object>();
// objStore.addItem({name: 'Max'});
// objStore.addItem({name: 'Kirsty'});
// objStore.removeItem({name: 'Max'});
// console.log(objStore.getItems())


// -- Generics utility

interface Course {
  title: string;
  desc: string;
  complete: Date;
}

function createCourse(title: string, desc: string, date: Date): Course {
  let course: Partial<Course> = {}; // Partial all objects are converted to optional
  course.title = title;
  course.desc = desc; 
  course.complete = date;

  return course as Course;
}

const namelist: Readonly<string[]> = ['Kirsty', 'Phillip'];
namelist.push('Lynsey') // Can't do this, it's read only!!
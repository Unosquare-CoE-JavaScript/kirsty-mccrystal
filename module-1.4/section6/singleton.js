const fs = require('fs');
const path = require('path');

// Singleton

// A component which is instantiated only once

class Singleton {
  constructor() {
    // this creates a singleton
    const instance = this.constructor.instance;
    if (instance) {
      return instance
    }

    this.constructor.instance = this;
  }

  foo() {
    console.log('something is happening')
  }
}

let s1 = new Singleton();
let s2 = new Singleton()
console.log((s1 === s2) + 'they are the same')
console.log(s1.foo());

// Second version of creating a singleton (Monostate)
class Chief {
  get name() {
    return Chief._name
  }

  set name(value) {
    Chief._name = value;
  }

  get age() {
    return Chief._age
  }

  set age(value) {
    return Chief._age = value;
  }

  toString() {
    return `${this.name} ${this.age}`
  }
}

Chief._age = undefined;
Chief._name = undefined;

let ceo = new Chief();
ceo.name = 'Kirsty';
ceo.age = '28';

console.log(ceo.toString());

let ceo2 = new Chief();
ceo2.name = 'Lynsey'
ceo2.age = '28'

console.log(ceo2.toString())

// Singleton Problems
class MyDatabase
{
  constructor()
  {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }

    this.constructor.instance = this;


    console.log(`Initializing database`);
    this.capitals = {};

    let lines = fs.readFileSync(
      path.join(__dirname, 'capitals.txt')
    ).toString().split('\r\n');

    for (let i = 0; i < lines.length/2; ++i)
    {
      this.capitals[lines[2*i]] = parseInt(lines[2*i+1]);
    }
  }

  getPopulation(city)
  {
    // possible error handling here
    return this.capitals[city];
  }
}

// ↑↑↑ low-level module

// ↓↓↓ high-level module

class SingletonRecordFinder
{
  totalPopulation(cities)
  {
    return cities.map(
      city => new MyDatabase().getPopulation(city)
    ).reduce((x,y) => x+y);
  }
}

class ConfigurableRecordFinder
{
  constructor(database)
  {
    this.database = database;
  }

  totalPopulation(cities)
  {
    return cities.map(
      city => this.database.getPopulation(city)
    ).reduce((x,y) => x+y);
  }
}

class DummyDatabase
{
  constructor()
  {
    this.capitals = {
      'alpha': 1,
      'beta': 2,
      'gamma': 3
    };
  }

  getPopulation(city)
  {
    // possible error handling here
    return this.capitals[city];
  }
}
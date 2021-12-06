// PROXY pattern

// A class that functions as an interface to a particular resource

// Value proxy

class Percentage {
  constructor(percent) {
    this.percent = percent;
  }

  toString() {
    return `${this.percent}%`
  }

  valueOf() {
    return this.percent / 100;
  }
}


let fivePercent = new Percentage(5);
console.log(fivePercent.toString());
console.log(`5% of 50 is ${50*fivePercent}`) // Value proxy


// Property proxy 

class Property {
  constructor(value, name = '') {
    this._value = value;
    this.name = name
  }

  get value() {
    return this._value
  }

  set value(newValue) {
    if (this._value === newValue) {
      return
    }

    console.log(`Assigning ${newValue} to ${this.name}`)
    this._value = newValue;
  }
}

class Creature {
  constructor() {
    this._agility = new Property(10, 'agility'); // Proxy class
  }

  get agility() {
    return this._agility.value;
  }

  set agility(value) {
    return this._agility._value = value;
  }
}

let c = new Creature();
c.agility = 40;

// Protection Proxy

class Car {
  drive() {
    console.log(`Car is driving`)
  }
}

// adding a protection proxy to add protection to the class
class CarProxy {
  constructor(driver) {
    this.driver = driver
    this._car = new Car();
  }

  drive(){
    if (this.driver.age >= 18) {
      this._car.drive();
    } else {
      console.log('Driver too young!')
    }
  }
}

class Driver {
  constructor(age) {
    this.age = age;
  }
}

let car = new Car();
car.drive();

let car2 = new CarProxy(new Driver(10));
car2.drive();

// Virtual Proxy

class Image {
  constructor(url) {
    this.url = url;
    console.log(`Loading from ${url}`)
  }

  draw() {
    console.log(`Draw from ${this.url}`)
  }
}

// Don't intilize URL until it's needed
class LazyImage {
  constructor(url) {
    this.url = url
  }

  draw() {
    if (!this.image) {
      this.image = new Image(this.url);
      this.image.draw();
    }
  }
}

function drawImage(img) {
  console.log('draw')
  img.draw()
  console.log('done')
}

let img = new LazyImage('url link')
drawImage(img)
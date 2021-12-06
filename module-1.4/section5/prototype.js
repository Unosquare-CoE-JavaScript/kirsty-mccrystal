class Address {
  constructor(streetAddress, city, country) {
    this.streetAddress = streetAddress
    this.city = city
    this.country = country
  }

  // deepCopy() {
  //   return new Person(
  //     this.streetAddress,
  //     this.city,
  //     this.country
  //   )
  // }

  toString() {
    return `${this.streetAddress} ${this.city} ${this.country}`
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  // deepCopy() {
  //   return new Person(
  //     this.name,
  //     this.address.deepCopy()
  //   )
  // }

  toString() {
    return `${this.name} ${this.address}`
  }

  greet() {
    console.log(`Hi my name is ${this.name}` + `I live at ${this.address.toString()}`)
  }
}



class Serializer {
  constructor(types) {
    this.types = types;
  }

  makeRecursive(object) {
    let idx = this.types.findIndex(t => {
      return t.name === object.constructor.name;
    })

    if (idx !== -1) {
      object['typeIndex'] = idx;

      for (let key in object) {
        if (object.hasOwnProperty(key)) {
          this.makeRecursive(object[key])
        }
      }
    }
  }

  reconstructRecursive(object) {
    if(object.hasOwnProperty('typeIndex')) {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for ( let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object) {
    this.makeRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

let kirsty = new Person('Kirsty', new Address('123 Belfast road', 'Belfast', 'UK'));

// let lynsey = kirsty.deepCopy();
// lynsey.name = 'Lynsey'
// lynsey.address.streetAddress = 'test address'
let s = new Serializer([Person, Address]);
let lynsey = s.clone(kirsty)
lynsey.name = 'Lynsey'
lynsey.address.streetAddress = 'test address'

console.log(kirsty.toString())
console.log(lynsey.toString())
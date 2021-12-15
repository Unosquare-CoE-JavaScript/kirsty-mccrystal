// Observer Pattern

// Listen for events or changes that happen on the Object property

// An object that wishes to be informed about events happenings
// in the system. The entity generating the events
// is an observable

// Events

class Event {
 constructor() {
   this.handlers = new Map();
   this.count = 0;
 }

 subscribe(handler) {
   this.handlers.set(++this.count, handler);
   return this.count;
 }

 unsubscribe(index) {
   this.handlers.delete(index);
 }

 fireNotification(sender, args) {
   this.handlers.forEach(
     (callback, key) => callback(sender, args) 
   )
 }
}

// class FallsIllArgs {
//   constructor(address) {
//     this.address = address;
//   }
// }

// class Person {
//   constructor(address) {
//     this.address = address;
//     this.fallsIll = new Event();
//   }

//   catchCold() {
//     this.fallsIll.fireNotification(this, new FallsIllArgs(this.address))
//   }
// }

// let person = new Person('33 abc road')
// let sub = person.fallsIll.subscribe((s, a) => {
//   console.log(`A doc has been called to ${a.address}`)
// })

// person.catchCold();
// person.catchCold();

// person.fallsIll.unsubscribe(sub);
// person.catchCold();

// // Property Observers

class PropChangedArg {
  constructor(name, newValue){
    this.name = name;
    this.newValue = newValue
  }
}

class Person {
  constructor(age) {
    this._age = age;
    this.propertyChanges = new Event();
  }

  get age() {
    return this._age
  }

  set age(value) {
    if ( !value || this._age === value) {
      return;
    }

    let oldCanVote = this.canVote

    this._age = value;
    this.propertyChanges.fireNotification(this, new PropChangedArg('age', value))

    if (oldCanVote !== this.canVote) {
      this.propertyChanges.fireNotification(this, new PropChangedArg('canVote', value))
    }
  }

  get canVote() {
    return this._age >= 16;
  }
}

// class RegistrationChecker {
//   constructor(person) {
//     this.person = person
//     this.token = person.propertyChanges.subscribe(
//       this.age_changed.bind(this)
//     )
//   }

//   age_changed(sender, args){
//     if(sender === this.person && args.name === 'age') {
//       if (args.newValue < 13) {
//         console.log('sorry your under age')
//       } else {
//         console.log('okay, good to go')
//         sender.propertyChanges.unsubscribe(this.token)
//       }
//     }
//   }
// }


//Property Dependencies
class VotingChecker {
  constructor(person) {
    this.person = person;
    this.person.propertyChanges.subscribe(
      this.voting_changed.bind(this)
    )
  }

  voting_changed(sender, args) {
    if ( sender === this.person && args.name === 'canVote') {
      console.log(`Voting status changes to ` +
        args.newValue
      )
    }
  }
}


let person = new Person('John');
let checker = new VotingChecker(person)
for ( let i = 10; i < 20; ++i) {
  console.log(`changing age to ${i}`);
  person.age = i;
}
// let checker = new RegistrationChecker(person);
// for ( let i = 10; i < 20; ++i) {
//   console.log(`changing age to ${i}`);
//   person.age = i;
// }
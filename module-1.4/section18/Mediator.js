// Mediator patterns

// Facilitates commincation between components

class Person {
  constructor(name) {
    this.name = name;
    this.chatLog = [];
  }

  receive(sender, message) {
    let s = `${sender}: ${message}`
    this.chatLog.push(s);
    console.log(`[${this.name}'s chat session] ${s}`)
  }

  say(message) {
    this.room.broadcast(this.name, message);
  }

  pm(who, message) {
    this.room.message(this.name, who, message);
  }
}

class Chatroom {
  constructor() {
    this.people = [];
  }

  join(p) {
    let joinMsg = `${p.name} joins the chat`;
    this.broadcast('room', joinMsg);
    p.room = this;
    this.people.push(p);
  }

  broadcast(source, message) {
    for ( let p of this.people) {
      if ( p.name !== source) {
        p.receive(source, message);
      }
     }
  }

  message(source, destination, message) {
    for ( let p of this.people) {
      if ( p.name === destination) {
        p.receive(source, message);
      }
     }
  }
}

let room = new Chatroom();
let kirsty = new Person('Kirsty');
let lynsey = new Person('Lynsey');

room.join(kirsty);
room.join(lynsey);

kirsty.say('hi room');
lynsey.say('helloooo')

let phillip = new Person('Phillip')
room.join(phillip)

phillip.say('hi')

lynsey.pm('Phillip', 'hellloooo')

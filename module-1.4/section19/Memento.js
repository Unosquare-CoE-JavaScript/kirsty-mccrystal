// Memento Pattern

// Objects goe through changes

// token/handle representing the system state. Let us roll back to the state
// snapshot of the system

// Don't modify the state of a Memento!!! 
class Memento {
  constructor(balance) {
    this.balance = balance;
  }
}

class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
    this.changes = [new Memento(balance)];
    this.current = 0;
  }

  deposit(amount) {
    this.balance += amount;
    let m = new Memento(this.balance);
    this.changes.push(m);
    this.current++;
    return m;
  }

  restore(m) {
    if (m) {
      this.balance = m.balance;
      this.changes.push(m);
      this.current = this.changes.count - 1;
    }
  }

  undo() {
    if (this.current > 0) {
      let m = this.changes[--this.current];
      this.balance = m.balance;
      return m;
    }
    return console.log('can\'t undo');
  }

  redo() {
    if (this.current + 1 < this.changes.length) {
      let m = this.changes[++this.current];
      this.balance = m.balance;
      return m;
    }
  }

  toString() {
    return `Balance: ${this.balance}`;
  }
}

// let ba = new BankAccount(100);
// let m1 = ba.deposit(50);
// let m2 = ba.deposit(25);
// console.log(ba.toString());

// ba.restore(m1);
// console.log(ba.toString());

// ba.restore(m2);
// console.log(ba.toString());

// Undo redo

let ba = new BankAccount(100);
let m1 = ba.deposit(50);
let m2 = ba.deposit(25);
console.log(ba.toString());

ba.undo();
console.log('1', ba.toString());

ba.undo()
console.log('2', ba.toString());

ba.redo();
console.log('3', ba.toString());


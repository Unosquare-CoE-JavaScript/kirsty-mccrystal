// Iterators Pattern

// An object that faciliates the traversal of a data structure.

//Array backed property

class Creature {
  constructor() {
    //this.strength = this.agility = this.intelligence = 10;
    this.stats = new Array(2).fill(10);
  }

  get strength() {
    return this.stats[0];
  }

  set strength(value) {
    this.stats[0] = value;
  }

  get agility() {
    return this.stats[1];
  }

  set agility(value) {
    this.stats[1] = value;
  }

  get intelligence() {
    return this.stats[2];
  }

  set intelligence(value) {
    this.stats[2] = value;
  }

  get sumOfStats() {
    return this.stats.reduce((x,y) => x+y, 0)
  }

  get averageStat() {
    return this.sumOfStats / this.stats.length;
  }

  get maxStat() {
    return Math.max(...this.stats);
  }

  // get sumOfStats() {
  //   return this.strength + this.agility + this.intelligence;
  // }

  // get averageStat() {
  //   return this.sumOfStats / 3.0;
  // }

  // get maxStat() {
  //   return Math.max(this.strength, this.agility, this.intelligence);
  // }
}

let cre = new Creature();
cre.strength = 10;
cre.agility = 11;
cre.intelligence = 15;

console.log(
  `Creature has average stat ${cre.averageStat} ` +
    `max stat = ${cre.maxStat} ` +
    `sum stat ${cre.sumOfStats}`
);

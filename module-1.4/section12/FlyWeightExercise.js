class Capitalize {
  constructor(capitalize = false) {
    this.capitalize = capitalize;
  }
}

class Sentence {
  constructor(plainText) {
    // todo
    this.plainText = plainText.split(" ");
    this.location = {};
    this.index
  }

  at(index) {
    // todo
    let test = new Capitalize();
    this.location[index] = test;
    this.index = index;
    return this.location[index];
  }

  toString() {
    console.log(this.plainText[this.index]);
    console.log(this.location[this.index])
    // todo
    if (this.location[this.index] && this.location[this.index].capitalize) {
      this.plainText[this.index] = this.plainText[this.index].toUpperCase();
    }
    return this.plainText.join(' ');
  }
}

let s = new Sentence("alpha beta gamma");
s.at(1).capitalize = true;
console.log(s.toString());

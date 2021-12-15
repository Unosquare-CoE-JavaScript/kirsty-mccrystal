// FLYWEIGHT pattern - avoid redundancy when storing data

// A space optimization technique that lets us use less memory by storing data externally

class FormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.caps = new Array(plainText.length).map(() => false);
  }

  capitalize(start, end) {
    for (let i = start; i <= end; i++) {
      this.caps[i] = true;
    }
  }

  toString() {
    let buffer = []
    for ( let i in this.plainText) {
      let c = this.plainText[i];
      buffer.push(this.caps[i] ? c.toUpperCase() : c);
    }
    return buffer.join('');
  }
}

class TextRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.capitalize = false;
  }

  covers(position) {
    return position >= this.start && position <= this.end;
  }
}

class BetterFormattedText  {
  constructor(plainText) {
    this.plainText = plainText;
    this.formatting = [];
  }

  getRange(start, end) {
    let range = new TextRange(start, end);
    this.formatting.push(range);
    return range;
  }

  toString() {
    let buffer = [];
    for ( let i in this.plainText ) {
      let c = this.plainText[i];
      for ( let range of this.formatting) {
        if (range.covers(i) && range.capitalize) {
          c = c.toUpperCase();
        }
        buffer.push(c);
      }
      return buffer.join('');
    }
  }
}

const text = 'Testing this text';
let ft = new FormattedText(text);
ft.capitalize(1, 10);
console.log(ft.toString());

let bft = new BetterFormattedText(text);
bft.getRange(1, 10).capitalize = true;
console.log(bft.toString())
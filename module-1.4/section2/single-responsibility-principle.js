// Single responsibility principles - SOLID

// Antipattern - the GOD object meaning one class is doing too much or has too many logic.
// serparation of concerns - split up large logics, classes, componments based on relations

const fs = require('fs');

class Journal
{
  constructor() {
    this.entries = {};
  }

  addEntry(text)
  {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index)
  {
    delete this.entries[index];
  }

  toString()
  {
    return Object.values(this.entries).join('\n');
  }

  /** 
   * Below will add multiple responsibilities to the class object
   * 
   * 
  */
  // save(filename)
  // {
  //   fs.writeFileSync(filename, this.toString());
  // }
  //
  // load(filename)
  // {
  //   //
  // }
  //
  // loadFromUrl(url)
  // {
  //   //
  // }
}
Journal.count = 0;

class PersistenceManager
{
  preprocess(j)
  {
    //
  }

  saveToFile(journal, filename)
  {
    fs.writeFileSync(filename, journal.toString());
  }
}

let j = new Journal();
j.addEntry('I cried today.');
j.addEntry('I ate a bug.');
console.log(j.toString());

let p = new PersistenceManager();
let filename = '';
p.saveToFile(j, filename);

// separation of concerns
function randMax(max) {
  return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
  symbols: [
    "X", "Y", "Z", "W", "$", "*", "<", "@"
  ],
  spin() {
    if (this.position == null) {
      this.position = randMax(
        this.symbols.length - 1
      )
    }
    this.position = (
      this.position + 100 + randMax(100)
    ) % this.symbols.length
  },
  display() {
    if (this.position == null) {
      this.position = randMax(
        this.symbols.length - 1 
      )
    }
    return this.symbols[this.position]
  }
}

var slotMachine = {
  reels: [
    Object.create(reel), // Creates an new objects and prototype-link it to another object. In this case the reel object above
    Object.create(reel),
    Object.create(reel)
  ],
  spin() {
    this.reels.forEach((reel) => {
      reel.spin()
    })
  },
  display() {
    var slotLines = []

    for ( let slotLinePos = -1; slotLinePos <= 1; slotLinePos++) {
      let line = this.reels.map((reel) => { // this refers to the slotMachine object, so this.reels resolves to the reels array containing copies of the reel object.
        var slot = Object.create(reel) // We then want create a copy of the reel object above ( line: 5 )
        slot.position = (  // the assigment of slot.position directly happens on the slot variable (line: 45 ) and not reel object.
          reel.symbols.length +  // But then we access the values from the delegated reel object which we copied before in the reels array. slot ---> reel
          reel.position + 
          slotLinePos
        ) % reel.symbols.length
        
        return reel.display.call(slot) // Here we call the reel object display() and assign the slot object to be used for setting the this reference. So this.position on line: 20 & 21 is refering to slot.position
      })
      slotLines.push(line.join(' | '))
    }

    return console.log(slotLines.join('\n'))
  }
}

slotMachine.spin()
slotMachine.display()

//State Pattern

// A patten in which the object behavior is determined by
// it's state. From one state to another

// Classic state

class Switch {
  constructor() {
    this.state = new OffState();
  }

  on() {
    this.state.on(this);
  }

  off() {
    this.state.off(this);
  }
}

class State {
  constructor() {
    if (this.constructor === State) {
      throw new Error('abstract')
    } 
  }

  on(sw) {
    console.log(`Light is already on`)
  }

  off(sw) {
    console.log(`'Light is already off`)
  }
}

class OnState extends State {
  constructor() {
    super();
    console.log(`Light turned on`)
  }

  off(sw) {
    console.log(`Turning light off`);
    sw.State = new OffState();
  }
}

class OffState extends State {
  constructor() {
    super();
    console.log(`Light turned off`)
  }

  on(sw) {
    console.log(`Turning light one`)
    sw.State = new OnState();
  }
}

let sw = new Switch()
sw.on()
sw.off()
sw.off()


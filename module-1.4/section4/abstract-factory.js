//Abstract factory design pattern
// can have a hierachy and expose them


// Make an hierachy of factories
const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class HotDrink {
  consume() {}
}

class Tea extends HotDrink {
  consume() {
    console.log('this is a tea');
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log('this is a coffee')
  }
}

class HotDrinkFactory {
  // abstract
  prepare(amount) {

  }
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`add tea bag, boil water, pour ${amount}ml`)
    return new Tea();
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`add coffee granulas, boil water, pour ${amount}ml`)
    return new Coffee();
  }
}

let AvailableDrink = {
  coffee: CoffeeFactory,
  tea: TeaFactory
};

class HotDrinkMachine {

  constructor() {
    this.factories = {};
    for (let drink in AvailableDrink) {
      this.factories[drink] = new AvailableDrink[drink](); // enumeration and instantiate
    }
  }

  interact(consumer) {
    rl.question('What drink and size?', (answer) => {
      let parts = answer.split(' ');
      let name = parts[0];
      let amount = parseInt(parts[1]);
      let d = this.factories[name].prepare(amount);
      rl.close();
      consumer(d);
    })
  }

  // makeDrink(type) {
  //   switch(type) 
  //   {
  //     case 'tea':
  //       return new TeaFactory().prepare(200);
  //     case 'coffee':
  //       return new CoffeeFactory().prepare(100);
  //     default: 
  //       throw new Error('An error happened');
  //   }
  // }
}

let machine = new HotDrinkMachine();
// rl.question('Drink?', (answer) => {
//   let drink = machine.makeDrink(answer);
//   drink.consume();

//   rl.close();
// })

machine.interact((drink) => {
  drink.consume();
})
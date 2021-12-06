class SingletonTester {
  isSingleton(generator) {
    const ob1 = generator();
    const ob2 = generator();
    
    return ob1 === ob2
  }
}

let p = new SingletonTester().isSingleton(() => {});
console.log(p)
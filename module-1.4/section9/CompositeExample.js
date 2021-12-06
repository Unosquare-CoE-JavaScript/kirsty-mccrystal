class SingleValue
{
  constructor(value)
  {
    // todo
    this.value = value;
  }
  
  [Symbol.iterator]()
  {
      let returned = false;
      return {
          next: () => ({
              value: this.value,
              done: returned++
          })
      }
  }
}

class ManyValues extends Array
{
    // ensure there's a push(value) method
}

let sum = function(containers)
{
  // todo
  let result = 0
  for (let c of containers) {
    console.log({c})
    for (let i of c) {
      console.log({i})
      result += i;
    }
  }

  return result;
};

let singleValue = new SingleValue(11);
let otherValues = new ManyValues();
otherValues.push(22);
otherValues.push(33);

    console.log(sum([singleValue, otherValues]))
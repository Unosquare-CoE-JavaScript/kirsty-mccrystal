class Person
{
  constructor(id, name)
  {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory
{
  constructor() {
      this.id = 0
  }

  createPerson(name)
  {
    // todo
    return new Person(this.id++, name);
  }
}

let person1 = new PersonFactory()
console.log(person1.createPerson('Kirsty'));

let person2 = new PersonFactory()
console.log(person1.createPerson('Lynsey'));
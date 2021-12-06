class Person
{
  constructor(age=0)
  {
    this.age = age;
  }

  drink() { return 'drinking'; }
  drive() { return 'driving'; }
  drinkAndDrive() { return 'driving while drunk'; }
}

class ResponsiblePerson
{
  constructor(person)
  {
    this.person = person;
  }
  // todo
  get age() {
      return this.person.age
  }
  
  set age(value) {
     this.person.age = value;
  }
  
  drink() {
      if (this.age <= 18) {
          return 'too young'
      } else {
          return this.person.drink()
      }
  }
  
  drive() {
      if(this.age <= 16) {
          return 'too young'
      } else {
          return this.person.drive()
      }
  }
  
  drinkAndDrive() {
      return 'dead'
  }
  
}
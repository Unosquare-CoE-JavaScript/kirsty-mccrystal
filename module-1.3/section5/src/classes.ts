abstract class Department {
  static fiscalYear = 2021;
  // private id: string;
  // private name: string;
  //private employees: string[] = []; // Modifier (Private)
  protected employees: string[] = []; // Protected means it can be used in other classes which inherits.

  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  // Applying this with type Department will make sure this is always refer to Department.
  abstract describe(this: Department): void

  addEmployee(employee: string) {
    // this.id = 'd2' - can't add to property because it's readonly
    this.employees.push(employee)
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

//Inheritance!!
class ITDeparment extends Department {
  admins: string[]

  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }

  describe() {
    console.log('IT Department - ID: ' + this.id);
  }
}

class AccountDepartment extends Department {
  private lastReport: string;
  private static instance: AccountDepartment

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value')
    }
    this.addReport(value)
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountDepartment('d2', []);
    return this.instance;
  }

  describe() {
    console.log('Accounting department - ID: ' + this.id);
  }

  addEmployee(name: string) {
    if (name === 'Kirsty') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports)
  }
}

const employee1 = Department.createEmployee('Lynsey');
console.log(employee1, Department.fiscalYear)

//const accounting = new Department('d1', 'Accounting')
const it = new ITDeparment('d1', ['Bob'])

it.addEmployee('Kirsty');
it.addEmployee('Phillip');

it.describe();
it.printEmployeeInfo();
console.log(it)

//const accounting = new AccountDepartment('d1', [])
const accounting = AccountDepartment.getInstance();
const accounting2 = AccountDepartment.getInstance();

console.log(accounting, accounting2)

accounting.mostRecentReport = 'this report will be set'
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport)

accounting.addEmployee('Kirsty');
accounting.addEmployee('Phillip')

// accounting.printReports();
// accounting.printEmployeeInfo();
accounting.describe();

// accounting.addEmployee('Kirsty');
// accounting.addEmployee('Phillip');

// accounting.describe();
// accounting.printEmployeeInfo();



//it.describe();


//Bonus note: the name will return undefined because we're no longer refering to the Department but accountCopy. Name property is missing!!
// const accountCopy = { describe: accounting.describe }

// accountCopy.describe() * accountCopy will error because we're missing the this.name reference.
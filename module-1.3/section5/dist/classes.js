"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2021;
class ITDeparment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log('IT Department - ID: ' + this.id);
    }
}
class AccountDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found');
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('Please pass in a valid value');
        }
        this.addReport(value);
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
    addEmployee(name) {
        if (name === 'Kirsty') {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}
const employee1 = Department.createEmployee('Lynsey');
console.log(employee1, Department.fiscalYear);
const it = new ITDeparment('d1', ['Bob']);
it.addEmployee('Kirsty');
it.addEmployee('Phillip');
it.describe();
it.printEmployeeInfo();
console.log(it);
const accounting = AccountDepartment.getInstance();
const accounting2 = AccountDepartment.getInstance();
console.log(accounting, accounting2);
accounting.mostRecentReport = 'this report will be set';
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);
accounting.addEmployee('Kirsty');
accounting.addEmployee('Phillip');
accounting.describe();
//# sourceMappingURL=classes.js.map
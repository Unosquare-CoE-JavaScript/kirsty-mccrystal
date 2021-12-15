"use strict";
var _a;
const e1 = {
    name: 'Kirsty',
    privileges: ['Update permissions'],
    startDate: new Date()
};
function add(n1, n2) {
    if (typeof n1 === 'string' || typeof n2 === 'string') {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}
const result = add('Kirsty', 'Mcc');
result.split(' ');
const fetchUserData = {
    id: 'u1',
    name: 'Kirsty',
    job: { title: 'CEO', description: 'I run the company' }
};
console.log((_a = fetchUserData === null || fetchUserData === void 0 ? void 0 : fetchUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const nullTest = '';
const data = nullTest !== null && nullTest !== void 0 ? nullTest : 'TEST';
console.log('data', data);
function printEmployeeInfo(emp) {
    console.log('name' + emp.name);
    if ('privileges' in emp) {
        console.log('priv' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('date' + emp.startDate);
    }
}
printEmployeeInfo(e1);
class Car {
    drive() {
        console.log('the car is driving ');
    }
}
class Truck {
    drive() {
        console.log('the truck is driving');
    }
    loadCargo(amount) {
        console.log('loading cargo' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(300);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('speed' + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 80 });
moveAnimal({ type: 'horse', runningSpeed: 100 });
const userInput = document.getElementById('testing-input');
userInput.value = 'Hi!';
const error = {
    email: 'not a valid email!',
    userName: 'Must be length of more than 1'
};
//# sourceMappingURL=app.js.map
"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(n) {
        this.age = 28;
        if (n) {
            this.name = n;
        }
        else {
            this.name = 'no name provided';
        }
    }
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
}
let user1;
user1 = new Person();
user1.greet('Hi my name is');
console.log(user1);
//# sourceMappingURL=app.js.map
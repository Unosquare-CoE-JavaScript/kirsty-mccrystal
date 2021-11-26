"use strict";
const names = ['Kirsty', 'McCrystal'];
names[0].split(' ');
const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve('done!');
    }, 2000);
});
promise.then(data => {
    data.split(' ');
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Kirsty' }, { age: 28 });
console.log(mergedObj);
function countAndPrint(data) {
    let print = 'Got nothing!';
    if (data.length > 0) {
        print = `Got ${data.length}`;
    }
    else if (data.length === 1) {
        print = `Only have ${data.length}`;
    }
    return [data, print];
}
console.log(countAndPrint(['test', 'test']));
function extractAndConvert(obj, key) {
    return obj[key];
}
console.log(extractAndConvert({ name: 'Kirsty' }, 'name'));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStore = new DataStorage();
textStore.addItem('Max');
textStore.addItem('Kirsty');
textStore.removeItem('Max');
console.log(textStore.getItems());
const numStore = new DataStorage();
function createCourse(title, desc, date) {
    let course = {};
    course.title = title;
    course.desc = desc;
    course.complete = date;
    return course;
}
//# sourceMappingURL=app.js.map
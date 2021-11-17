"use strict";

// fetch('https://jsonplaceholder.typicode.com/todos/')
//   .then((data) => data.json())
//   .then((obj) => console.log(obj))


let todo = {
  completed: false,
  userID: 1,
  title: "Learning Promises"
};

fetch('https://jsonplaceholder.typicode.com/todos/', {
  method: 'POST',
  headers: {
    "Content-type": "application/json"
  },
  body: JSON.stringify(todo)
})
.then((response) => response.json())
.then((obj) => console.log(obj))
.catch(reject => console.log(`Unable to add todo: ${reject}`))


  console.log('command that won\'t be blocked')
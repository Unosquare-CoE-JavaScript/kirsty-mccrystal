"use strict";

// Refactor the promise code to create an async function that will take a todo object as a parameter and add the todo to the jsonplaceholder site. 
// Make sure you account for possible errors.

let todo = {
    completed: false,
    userId: 1,
    title: "Learn Promises"
};

const postTodo = async (todoObj) => {
    try {
        let post = await fetch('https://jsonplaceholder.typicode.com/todos/', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(todoObj)
        })
        .then(response => response.json())
        
        console.log(post)
    }
    catch(e) {
        console.log(`Unable to create todo ${err}`)
    }

}

console.log('Other code');
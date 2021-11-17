"use strict";

//First, add the setTimeout code as shown in the intro to this exercise. Then modify the code by creating a promise so that the code can run asynchronously.

const massiveProcess = (num) => {
    let result = 0; 

    return new Promise((resolve, reject) => {
			if (isNaN(num)) {
				reject('Please enter a number')
			}
			setTimeout(() => {
					for (let i = num ** 7; i >= 0; i--) {        
							result += Math.atan(i) * Math.tan(i);
					};
					resolve(result);
			}, 0);
    })
    
};

/* 
	You could use above without the setTimeout, but the key difference is setTimeout will be handled outside of JS, then the event loop will fire the callback once everything else is completed.
	While, if setTimeout isn't there. JS will process the for loop first then resolve or reject will be added to the even loop.
*/



massiveProcess(10)
	.then((result) => console.log("The number is: " + result))
	.catch((err) => console.log(`An error occured: ${err}`))

//More processing later on
console.log(5 * 5 + 100);

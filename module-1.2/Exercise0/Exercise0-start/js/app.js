/*
Take a moment and analyze this code. What would it take to make it asynchronous using setTimeout? Try a few things and see how they work.
*/
let students = [{name:"Mary",score:90,school:"East"},
{name:"James",score:100,school:"East"},
{name:"Steve",score:40,school:"East"},
{name:"Gabe",score:90,school:"West"},
{name:"Rachel",score:85,school:"East"},
{name:"Rochelle",score:95,school:"West"},
{name:"Lynette",score:75,school:"East"}];

let processStudents = function(data, callback) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].school.toLowerCase() === "east") {
            if (typeof callback === "function") {
                callback(data[i]); // Wrapping setTimeout here will still call the console.log statement within determineTotal
            }
        }
    }
}

console.log("Before determineTotal");

let determineTotal = function() {
    let total = 0,
        count = 0;

    // Don't set timeout here, console.log will be printed before callback is called ( never updates ).
    processStudents(students, function(obj) {
        total = total + obj.score;
        count++;
    });

    console.log("Total Score: " + total + " - Total Count: " + count);
}

//Don't block while waiting for determineTotal (asynchronous)
setTimeout(() => determineTotal(), 1000)

console.log("End of code.")

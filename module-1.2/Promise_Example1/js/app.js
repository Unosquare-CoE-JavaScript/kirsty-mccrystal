"use strict";

const swapi = (num) => {
  let url = "https://swapi.dev/api/people/";

  fetch(url + num + "/")
    .then((data) => data.json())
    .then((obj) => {
      console.log(obj);
      return fetch(obj.homeworld);
    })
    .then((hwdata) =>  hwdata.json())
    .then((hwobj) => console.log(hwobj))
}

swapi(4);

//This console log will happen before promise finishes ( or before if fetch finishes first )
console.log('other commands')
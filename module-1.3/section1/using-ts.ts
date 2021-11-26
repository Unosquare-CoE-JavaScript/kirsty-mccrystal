const button = document.querySelector("button");

// Lets typescript know that we are sure we are getting an element using the explantion mark. 
//We can also declare we know it will always be an HTMLInputElement
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

// Big advantage of typescript is the feature of specifing the type.
function add(num1: number, num2: number) {
  return num1 + num2;
}

button.addEventListener("click", function() {
  console.log(add(+input1.value, +input2.value));
});
var isPrime = (function () {

  // List of cached is prime number values
  let cache = {}

  function isPrime(v) {
    if (! (v in cache)) {
      if ( v <= 3 ) {
        return cache[v] = v > 1;
      }
        
      if ( v % 2 == 0|| v % 3 == 0 ) {
        return cache[v] = false;
      } 
        
      var vSqrt = Math.sqrt(v); 
        
      for ( let i = 5; i <= vSqrt; i+=6 ) {
        if ( v % i== 0|| v % (i+2) ==0 ) { 
          return cache[v] = false;
        }
      }
      return cache[v] = true
    }

    return cache[v]
  }

  return isPrime

})()

//Version 2 - ( see comment on version 1 below )

//IIFE - Immediately Invoked Function Ex-pression, useful for wanting to create a scope to hide variables/functions. Helps to avoid naming collisions.
var factorize = (function () {

  // List of cached is prime values
  let factorizeCache = {}
  
  return function factorize(v) {
    if (v in factorizeCache) {
      return factorizeCache[v]
    }

    if (!isPrime(v)) {
      let i = Math.floor(Math.sqrt(v));
      while ( v % i !=0 ) { 
        i--; 
      }
        
      return factorizeCache[v] = [...factorize(i), ...factorize(v/i)]; 
    }
  
    return factorizeCache[v] = [v]
  }

})()


//Version 1 - this was my first attempt but I noticed I was only stopping the call for isPrime and not the repeated factorize call. New version above

// //IIFE - Immediately Invoked Function Ex-pression, useful for wanting to create a scope to hide variables/functions. Helps to avoid naming collisions.
// var factorize = (function () {

//   // List of cached is prime values
//   let primeCache = {}
  
//   function factorize (v) {
//     // If number is already in cache use it, if not find out if new number is a prime then store in cache.
//     // reference to primeCache from inner function to the variable to an outer scope is called closure.
//     let isPrimeNumber = primeCache[v] || ( primeCache[v] = isPrime(v) )

//     if ( !isPrimeNumber ) {
//       let i = Math.floor(Math.sqrt(v));
        
//       while ( v % i !=0 ) 
//         { i--; }
        
//         return [...factorize(i),...factorize(v/i)]; 
//     }

//     return[v];
//   }

//   return factorize
// })()
  
  
console.log(isPrime(11))
console.log(isPrime(12))

console.log(factorize(11))
console.log(factorize(12))
console.log(factorize(12)) // Uses cache values instead of running logic within if block

function range(start, end) {

  start = start || 0

  // If end is undefined the we return an new instance of getRange function which saves the previous start variable (3 or 4)
  if (end === undefined) {
    return (end) => getRange(start, end) // Start isn't set in function scope so we look outside of the scope for start variable ( closure )???
  } else {
    return getRange(start, end)
  }

  function getRange(start, end) {
    var arr = []

    for (let i = start; i <= end; i++) {
      arr.push(i)
    }

    return console.log(arr)
  }
}

range(3,3); // [3]
range(3,8); // [3,4,5,6,7,8]
range(3,0); // []

var start3 = range(3);
var start4 = range(4);

start3(3); // [3]
start3(8); // [3,4,5,6,7,8]
start3(0); // []
start4(6); // [4,5,6]
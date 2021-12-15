// Factory method - A separate method - a static method for creating something
// Wholesale object - can be outsoured

// FACTORY
// A component responsible solely for the wholesale ( not piecewise ) creation of objects


CoordinateSystem = {
  cartesian: 0,
  polar: 1,
};

class Point {


  // Violation of the open-closed principle if we wanted to add new system
  // constructor(a, b, cs = CoordinateSystem.cartesian) {
  //   switch (cs) {
  //     case CoordinateSystem.cartesian:
  //       this.x = a;
  //       this.y = b;
  //       break;
  //     case CoordinateSystem.polar:
  //       this.x = a * Math.cos(b);
  //       this.y = a * Math.sin(b);
  //       break;
  //   }
  // }


  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // // Can't do this!!! Not allowed two constructors!
  // constructor(rho, theta) {
    // this.x = rho * Math.cos(theta);
    // this.y = rho * Math.sin(theta);
  // }

}

// Seperation of concerns principle
class PointFactory {
  // Factory method
  static newCartesianPoint(x, y) {
    return new Point(x, y)
  }

  // Factory method
  static newPolarPoint(rho, theta) {
    return new Point(
      rho * Math.cos(theta),
      rho * Math.sin(theta)
    )
  }
}


// Don't have to do this anymore
//let p1 = new Point(2, 3, CoordinateSystem.cartesian)

let p = PointFactory.newCartesianPoint(3, 6);
console.log(p);

let p2 = PointFactory.newPolarPoint(4, Math.PI/2);
console.log(p2);
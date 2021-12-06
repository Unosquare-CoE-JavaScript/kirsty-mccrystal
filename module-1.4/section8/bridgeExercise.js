// class Shape
// {
//   constructor(name)
//   {
//     this.name = name;
//   }
// }
//
// class Triangle extends Shape
// {
//   constructor()
//   {
//     super('triangle');
//   }
// }
//
// class Square extends Shape
// {
//   constructor()
//   {
//     super('square');
//   }
// }
//
// class VectorSquare extends Square
// {
//   toString()
//   {
//     return `Drawing square as lines`;
//   }
// }
//
// class RasterSquare extends Square
// {
//   toString()
//   {
//     return `Drawing square as pixels`;
//   }
// }

// imagine VectorTriangle and RasterTriangle are here too

class Shape {
  constructor(renderer, name) {
      this.renderer = renderer.whatToRenderAs;
      this.name = name;
  }
  
  toString() {
      return `Drawing ${this.name} as ${this.renderer}`;
  }
}

class Circle extends Shape {
  constructor(renderer) {
      super(renderer, 'circle');
  }
}

class Square extends Shape {
  constructor(renderer) {
      super(renderer, 'square');
  }
}

class Triangle extends Shape {
  constructor(renderer) {
      super(renderer, 'triangle');
  }
}

class VectorRenderer {
  get whatToRenderAs() {
      return 'lines';
  }
}

class RasterRenderer {
  get whatToRenderAs() {
      return 'pixels';
  }
}

let sq = new Square(new VectorRenderer());
console.log(sq.toString())

let sq2 = new Square(new RasterRenderer());
console.log(sq2.toString())

let tri = new Triangle(new VectorRenderer());
console.log(tri.toString())

let tri2 = new Triangle(new RasterRenderer());
console.log(tri2.toString())

let cir = new Circle(new VectorRenderer());
console.log(cir.toString())

let cir2 = new Circle(new RasterRenderer());
console.log(cir2.toString())
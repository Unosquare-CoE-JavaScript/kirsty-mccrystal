// Bridge pattern

// A mechanism that decouples an interface ( hierachy ) from an implementaion ( hierachy )
// JS has Duck typing, 

class VectorRenderer {

  renderCircle(radius) {
    console.log(`Drawing a circle of radius ${radius}`)
  }

}

class RasterRenderer {
  renderCircle(radius) {
    console.log(`Drawing pixels a circle of radius ${radius}`)
  }
}

class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }
}

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }

  draw() {
    this.renderer.renderCircle(this.radius);
  }

  resize(factor) {
    this.radius *= factor;
  }
}

// class Square {

// }


// Bridge is just a away to connect hierachies together

// Hierachies below
// Shape - Sqaure, Circle ...
// Renderer - Raster, Vector
let raster = new RasterRenderer();
let vector = new VectorRenderer();
let circle = new Circle(vector, 4);
circle.draw();
circle.resize(6);
circle.draw();
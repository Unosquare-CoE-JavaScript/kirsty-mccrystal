// Decorators patterns

// Don't want to rewrite existing code

// The addition of behavours to object without inhertiting from them

class Shape {
  constructor(color) {
    this.color = color;
  }
}

class Circle extends Shape {
  constructor(radius = 0) {
    super();
    this.radius = radius;
  }

  resize(factor) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius} `
  }
}

class ColoredShape extends Shape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }

  toString() {
    return `${this.shape.toString()}` + `has the color ${this.color}`
  }
}

class Transparent extends Shape {
  constructor(shape, transparency) {
    super();
    this.shape = shape;
    this.transparency = transparency
  }

  toString() {
    return `${this.shape.toString()} ` + `${this.transparency * 100.0}%`
  }
}

let cir = new Circle(2)
console.log(cir.toString())

let redCir = new ColoredShape(cir, 'red');
console.log(redCir.toString())

let tranCir = new Transparent(redCir, 0.5);
console.log(tranCir.toString())
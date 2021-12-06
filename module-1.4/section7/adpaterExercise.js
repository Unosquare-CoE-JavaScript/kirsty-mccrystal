class Square
{
  constructor(side)
  {
    this.side = side;
  }
}

function area(rectangle)
{
  return rectangle._width * rectangle._height;
}

class SquareToRectangleAdapter {
    constructor(square) {
        this._width = square.side;
        this._height = square.side;
    }
    
    get width() {
        return this._width;
    }
    
    get height() {
        return this._height;
    }
}

let sq = new Square(123);
let test = area(new SquareToRectangleAdapter(sq));
console.log(test)
class Point
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }
}

class Line
{
  constructor(start, end)
  {
    this.start = start;
    this.end = end;
  }

  deepCopy()
  {
    // todo
        const start = new Point(this.start.x, this.start.y);
        const end = new Point(this.end.x, this.end.y);
        return new Line(start, end);
  }
}

let line1 = new Line(new Point(3, 4), new Point(2,5));

let line2 = line1.deepCopy();
line2.start.x = line2.end.x = line2.end.x = line2.end.y = 0;

console.log(line2.start.x, line2.start.y)
console.log(line2.end.x, line2.end.y)
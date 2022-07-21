// given a matrix of binary bits where only one bit can be changed from 0 to 1
// what is the largest island of 1s that can be created in the given n x n matrix?
// I.E. m = [[1,0],[0,1]]; Changing one of the 0s to 1 creates island with area of 3.

let m = [
  [0,1,0],
  [0,0,1]
];

// class that defines an island node point in the matrix
class Node {
  constructor (x, y, m, r) {
    this.point = { x, y };
    this.matrix = m;
    this.rootNode = r || this;
    this.childNodes = [];
    this.direction = 0;
  }

  // get the area under for this node and children
  getArea () {
    let area = 1;
    for (let i = 0; i < this.childNodes.length; i++) {
      area += this.childNodes[i].getArea();
    }
    return area;
  }

  // get the node at given point if it exists
  getNode (x, y) {
    if (this.point.x == x && this.point.y == y) return this;
    if (!this.childNodes.length) return;
    // check child nodes
    for (let i = 0; i < this.childNodes.length; i++) {
      let n = this.childNodes[i].getNode(x, y);
      if (n) return n;
    }
  }

  // walk island points from this node
  walk () {
    // try to walk in all directions
    do {
      // get next walk point
      let point = this.getWalkPoint();
      if (!point) continue;
      // check if walked node already exists for the point
      let walkedNode = this.rootNode.getNode(point.x, point.y);
      if (walkedNode) continue;
      // create the new walked node and walk the new node
      this.childNodes.push(new Node(point.x, point.y, this.matrix, this.rootNode));
      this.childNodes[this.childNodes.length - 1].walk();
    } while (this.direction++ < 8);
  }

  // get walk point if available given current direction
  getWalkPoint () {
//    if (this.direction == 8) return false;
    let point = this.walkPoint();
    if (!point) return false;
    // check if point exceeds matrix bounds
    if (point.x < 0 || point.y < 0 || point.x == this.matrix[0].length || point.y == this.matrix.length) return false;
    // check if matrix point can be walked
    if (!this.matrix[point.y][point.x]) return false;
    return point;
  }

  // get walk point given current direction
  walkPoint () {
    switch (this.direction) {
      case 0:
        return { x: this.point.x, y: this.point.y - 1 };

      case 1:
        return;// { x: this.point.x + 1, y: this.point.y -1 };

      case 2:
        return { x: this.point.x + 1, y: this.point.y };

      case 3:
        return;// { x: this.point.x + 1, y: this.point.y + 1 };

      case 4:
        return { x: this.point.x, y: this.point.y + 1 };

      case 5:
        return;// { x: this.point.x - 1, y: this.point.y + 1 };

      case 6:
        return { x: this.point.x - 1, y: this.point.y };

      case 7:
        return;// { x: this.point.x - 1, y: this.point.y - 1 };
    }
  }
}


// track the max island area and the points that will create this area
let maxArea = 0;
let maxPoints = [];

// search for maximum area change
for (let y = 0; y < m.length; y++) {
  for (let x = 0; x < m[y].length; x++) {
    if (m[y][x]) continue;
    let node = new Node(x, y, m);
    node.walk();
    let area = node.getArea();
    if (area && area >= maxArea) {
      if (maxArea != area) maxPoints = [];
      maxArea = area;
      maxPoints.push({ x, y });
    }
  }
}

console.log('Maximum area possible: ', maxArea);
console.log('Matrix point(s) that result in maximum area: ');
for (let i = 0; i < maxPoints.length; i++) console.log(maxPoints[i]);


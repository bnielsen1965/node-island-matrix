# node-island-matrix

A javascript solution to the maximum area binary island matrix.

Doing some exercises to learn. Given a matrix of binary values where you can 
toggle only one bit from 0 to 1, what is the largest island made of 1s that 
you can create.

I.E. Given the following matrix...
```javascript
let m = [
  [0,1,0],
  [0,0,1]
];
```

There are a total of 4 points that can be toggled from 0 to 1, but two of the
points will result in the largest contiguous area in the matrix.

Toggling point { 0, 0 } would result in a maximum area of 2.
```javascript
let m = [
  [1,1,0],
  [0,0,1]
];
```


Toggling point { 0, 1 } would result in a maximum area of 1.
```javascript
let m = [
  [0,1,0],
  [1,0,1]
];
```


And toggling points { 2, 0 } or { 1, 1 } would result in a maximum area of 3.
```javascript
let m = [
  [0,1,1],
  [0,0,1]
];
```
or...
```javascript
let m = [
  [0,1,0],
  [0,1,1]
];
```
# StablePriorityQueue.js
A stable heap-based priority queue in JavaScript

A heap can be used to implement a priority queue. At all times, you can insert
elements quickly in a heap, and query the smallest element. You remove (poll)
the smallest element quickly as well.

StablePriorityQueue is an attempt to implement a priority queue
in JavaScript that is stable. That is, when equal values are inserted, it will always poll the oldest of the equal values.

License: Apache License 2.0

Usage
===

```javascript
var x = new StablePriorityQueue();
x.add(1);
x.add(0);
x.add(5);
x.add(4);
x.add(3);
x.peek(); // should return 0, leaves x unchanged
x.size; // should return 5, leaves x unchanged
while(!x.isEmpty()) {
  console.log(x.poll());
} // will print 0 1 3 4 5
x.trim(); // (optional) optimizes memory usage
```

You can also provide the constructor with a comparator function.


```javascript
var x = new StablePriorityQueue(function(a,b) {return b - a});
x.add(1);
x.add(0);
x.add(5);
x.add(4);
x.add(3);
while(!x.isEmpty()) {
  console.log(x.poll());
} // will print 5 4 3 1 0
```

or


```javascript
var x = new StablePriorityQueue(function(a, b) {
      return a.energy - b.energy;
});
[{ name: 'player', energy: 10},
 { name: 'monster1', energy: 10},
 { name: 'monster2', energy: 10},
 { name: 'monster3', energy: 10}
].forEach(function(o){
      x.add(o);
})
while (!x.isEmpty()) {
    console.log(x.poll());
}
// will output:
//{ name: 'player', energy: 10 }
//{ name: 'monster1', energy: 10 }
//{ name: 'monster2', energy: 10 }
//{ name: 'monster3', energy: 10 }
```


If you are using node.js, you need to import the module:

```javascript
var StablePriorityQueue = require("stablepriorityqueue");
var b = new StablePriorityQueue();// initially empty
b.add(1);// add the value "1"
```
npm install
===

      $ npm install stablepriorityqueue

Computational complexity
===

The function calls "add" and "poll" have logarithmic complexity with respect
to the size of the data structure (attribute size). Looking at the top value
is a constant time operation.



Testing
===

Using node.js (npm), you can test the code as follows...

      $ npm install mocha
      $ npm test

You might also like...
===

If you like this library, you might also like
- https://github.com/lemire/FastBitSet.js
- https://github.com/lemire/FastPriorityQueue.js

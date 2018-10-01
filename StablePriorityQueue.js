/**
 * StablePriorityQueue.js : a stable heap-based priority queue  in JavaScript.
 * (c) the authors
 * Licensed under the Apache License, Version 2.0.
 *
 * Stable heap-based priority queue for modern browsers and JavaScript engines.
 *
 * Usage :
         Installation (in shell, if you use node):
         $ npm install stablepriorityqueue

         Running test program (in JavaScript):

         // var StablePriorityQueue = require("stablepriorityqueue");// in node
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
 */
"use strict";

var defaultcomparator = function (a, b) {
    return   a < b ? -1 : (a > b ? 1 : 0) ;
};


// the provided comparator function should take a, b and return a negative number when a < b and equality when a == b
function StablePriorityQueue(comparator) {
    this.array = [];
    this.size = 0;
    this.runningcounter = 0;
    this.compare = comparator || defaultcomparator;
    this.stable_compare = function(a, b) {
      var cmp = this.compare(a.value,b.value);
      return (cmp < 0) || ( (cmp == 0) && (a.counter < b.counter) );
    }
}

// The stable queue uses internal counters, this repacks them
// runs in O(n) time, called automatically as needed
StablePriorityQueue.prototype.renumber = function (myval) {
      // the counter is exhausted, let us repack the numbers
      // implementation here is probably not optimal performance-wise
      // we first empty the content
      var buffer = [];
      var j, size;
      while(! this.isEmpty() ) {
        buffer.push(this.poll());
      }
      size = buffer.length;
      this.runningcounter = 0; // because the buffer is safe, this is now safe
      // and we reinsert it
      for (j = 0; j < size ; j++) {
        this.add(buffer[j]);
      }
}

// Add an element the the queue
// runs in O(log n) time
StablePriorityQueue.prototype.add = function (myval) {
    var i = this.size;
    if ( this.runningcounter + 1 == 0) {
      this.renumber();
    }
    var extendedmyval = {value: myval, counter: this.runningcounter};
    this.array[this.size] = extendedmyval;
    this.runningcounter += 1;
    this.size += 1;
    var p;
    var ap;
    var cmp;
    while (i > 0) {
        p = (i - 1) >> 1;
        ap = this.array[p];
        if (!this.stable_compare(extendedmyval, ap)) {
             break;
        }
        this.array[i] = ap;
        i = p;
    }
    this.array[i] = extendedmyval;
};

// for internal use
StablePriorityQueue.prototype._percolateUp = function (i) {
    var myval = this.array[i];
    var p;
    var ap;
    while (i > 0) {
        p = (i - 1) >> 1;
        ap = this.array[p];
        if (!this.stable_compare(myval, ap)) {
            break;
        }
        this.array[i] = ap;
        i = p;
    }
    this.array[i] = myval;
};


// for internal use
StablePriorityQueue.prototype._percolateDown = function (i) {
    var size = this.size;
    var hsize = this.size >>> 1;
    var ai = this.array[i];
    var l;
    var r;
    var bestc;
    while (i < hsize) {
        l = (i << 1) + 1;
        r = l + 1;
        bestc = this.array[l];
        if (r < size) {
            if (this.stable_compare(this.array[r], bestc)) {
                l = r;
                bestc = this.array[r];
            }
        }
        if (!this.stable_compare(bestc,ai))  {
            break;
        }
        this.array[i] = bestc;
        i = l;
    }
    this.array[i] = ai;
};

// Look at the top of the queue (a smallest element)
// executes in constant time
//
// Calling peek on an empty priority queue returns
// the "undefined" value.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
//
StablePriorityQueue.prototype.peek = function () {
    if(this.size == 0) return undefined;
    return this.array[0].value;
};

// remove the element on top of the heap (a smallest element)
// runs in logarithmic time
//
// If the priority queue is empty, the function returns the
// "undefined" value.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
//
// For long-running and large priority queues, or priority queues
// storing large objects, you may  want to call the trim function
// at strategic times to recover allocated memory.
StablePriorityQueue.prototype.poll = function () {
    if (this.size == 0)
        return undefined;
    var ans = this.array[0];
    if (this.size > 1) {
        this.array[0] = this.array[--this.size];
        this._percolateDown(0 | 0);
    } else {
        this.size -= 1;
    }
    return ans.value;
};


// recover unused memory (for long-running priority queues)
StablePriorityQueue.prototype.trim = function () {
    this.array = this.array.slice(0, this.size);
};

// Check whether the heap is empty
StablePriorityQueue.prototype.isEmpty = function () {
    return this.size === 0;
};


// just for illustration purposes
var main = function () {
    // main code
    var x = new StablePriorityQueue(function (a, b) {
        return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0) ;
    });
    x.add({name:"Jack", age:31});
    x.add({name:"Anna", age:111});
    x.add({name:"Jack", age:46});
    x.add({name:"Jack", age:11});
    x.add({name:"Abba", age:31});
    x.add({name:"Abba", age:30});
    while (!x.isEmpty()) {
        console.log(x.poll());
    }
    x = new StablePriorityQueue(function(a, b) {
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

};

if (require.main === module) {
    main();
}

module.exports = StablePriorityQueue;

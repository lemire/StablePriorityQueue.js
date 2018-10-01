/* This script expects node.js  and mocha */

'use strict';

describe('StablePriorityQueue', function() {
  var StablePriorityQueue = require('../StablePriorityQueue.js');
  var seed = 1;
  function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }
  it('example1', function() {
    var x = new StablePriorityQueue();
    x.add(1);
    x.add(0);
    x.add(5);
    x.add(4);
    x.add(3);
    if (x.poll() != 0) throw 'bug';
    if (x.poll() != 1) throw 'bug';
    if (x.poll() != 3) throw 'bug';
    if (x.poll() != 4) throw 'bug';
    if (x.poll() != 5) throw 'bug';
  });
  it('issue3', function() {
    var queue = new StablePriorityQueue(function(a, b) {
      return b - a;
    });
    for (var i = 0; i < 10; ++i) {
      queue.add(i);
    }
    queue.renumber();
    var counter = 9;
    while (!queue.isEmpty()) {
      if(queue.poll() != counter) throw "bug";
      counter--;
    }
  });
  it('is_stable', function() {
    var x = new StablePriorityQueue(function(a, b) {
      return a.energy > b.energy;
    });
    [{ name: 'player', energy: 10},
    { name: 'monster1', energy: 10},
    { name: 'monster2', energy: 10},
    { name: 'monster3', energy: 10}
    ].forEach(function(o){
      x.add(o);
    })
    if (x.poll().name != 'player') throw 'bug5';
    if (x.poll().name != 'monster1') throw 'bug4';
    if (x.poll().name != 'monster2') throw 'bug3';
    if (x.poll().name != 'monster3') throw 'bug1';
  });

  it('example2', function() {
    var x = new StablePriorityQueue(function(a, b) {
      return b - a;
    });
    x.add(1);
    x.add(0);
    x.add(5);
    x.add(4);
    x.add(3);
    if (x.poll() != 5) throw 'bug5';
    if (x.poll() != 4) throw 'bug4';
    if (x.poll() != 3) throw 'bug3';
    if (x.poll() != 1) throw 'bug1';
    if (x.poll() != 0) throw 'bug0';
  });

  it('Random', function() {
    for (var ti = 0; ti < 100; ti++) {
      var b = new StablePriorityQueue();
      var N = 1024 + ti;
      for (var i = 0; i < N; ++i) {
        b.add(Math.floor((random() * 1000000) + 1));
      }
      var v = 0;
      while (!b.isEmpty()) {
        var nv = b.poll();
        if (nv < v) throw 'bug';
        v = nv;
      }
    }
  });
  it('RandomArray', function() {
    for (var ti = 0; ti < 100; ti++) {
      var b = new StablePriorityQueue();
      var array = new Array();
      var N = 1024 + ti;
      for (var i = 0; i < N; ++i) {
        var val  = Math.floor((random() * 1000000) + 1);
        b.add(val);
        array.push(val);
      }
      array.sort(function(a, b) {
        return b - a;
      });
      while (!b.isEmpty()) {
        var nv = b.poll();
        var nx = array.pop();
        if (nv != nx) throw 'bug';
      }
    }
  });
  it('RandomArrayEnDe', function() {
    for (var ti = 0; ti < 100; ti++) {
      var b = new StablePriorityQueue();
      var array = new Array();
      var N = 16 + ti;
      for (var i = 0; i < N; ++i) {
        var val  = Math.floor((random() * 1000000) + 1);
        b.add(val);
        array.push(val);
      }
      array.sort(function(a, b) {
        return b - a;
      });
      for (var j = 0; j < 1000; ++j) {
        var nv = b.poll();
        var nx = array.pop();
        if (nv != nx) throw 'bug';
        var val  = Math.floor((random() * 1000000) + 1);
        b.add(val);
        array.push(val);
        array.sort(function(a, b) {
          return b - a;
        });
      }
    }
  });

});

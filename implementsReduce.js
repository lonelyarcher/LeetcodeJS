Array.prototype.myReduce = function(fn, init) {
    if (!this.length && init === undefined) throw "you need init for empty array";
    var i = 0, accu;
    if (init === undefined) {
        accu = this[0];
        i = 1;
    } else {
        accu = init;
    }
    for (; i < this.length; i++) {
        accu = fn(accu, this[i]);
    }
    return accu;
}

console.log([1, 2, 3].myReduce((a, c) => a + c, 1000));
console.log([1, 2, 3].myReduce((a, c) => a + c));
console.log([].myReduce((a, c) => a + c));

var largestValsFromLabels = function(values, labels, num_wanted, use_limit) {
    const cmp = (a, b) => a - b;    
    const map = {}
    for (let i = 0; i < values.length; i++) {
        map[labels[i]] = (map[labels[i]] || []).concat([values[i]]);
    }
    return Object.values(map).map(list => list.sort(cmp).slice(-use_limit)).reduce((a, c) => a.concat(c)).sort(cmp).slice(-num_wanted).reduce((a, c) => a + c);
};
console.info(Array.prototype.flat);
console.info(largestValsFromLabels(values = [5,4,3,2,1], labels = [1,1,2,2,3], num_wanted = 3, use_limit = 1));
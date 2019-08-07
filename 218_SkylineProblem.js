/* A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Now suppose you are given the locations and height of all the buildings as shown on a cityscape photo (Figure A), write a program to output the skyline formed by these buildings collectively (Figure B).

Buildings  Skyline Contour
The geometric information of each building is represented by a triplet of integers [Li, Ri, Hi], where Li and Ri are the x coordinates of the left and right edge of the ith building, respectively, and Hi is its height. It is guaranteed that 0 ≤ Li, Ri ≤ INT_MAX, 0 < Hi ≤ INT_MAX, and Ri - Li > 0. You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height 0.

For instance, the dimensions of all buildings in Figure A are recorded as: [ [2 9 10], [3 7 15], [5 12 12], [15 20 10], [19 24 8] ] .

The output is a list of "key points" (red dots in Figure B) in the format of [ [x1,y1], [x2, y2], [x3, y3], ... ] that uniquely defines a skyline. A key point is the left endpoint of a horizontal line segment. Note that the last key point, where the rightmost building ends, is merely used to mark the termination of the skyline, and always has zero height. Also, the ground in between any two adjacent buildings should be considered part of the skyline contour.

For instance, the skyline in Figure B should be represented as:[ [2 10], [3 15], [7 12], [12 0], [15 10], [20 8], [24, 0] ].

Notes:

The number of buildings in any input list is guaranteed to be in the range [0, 10000].
The input list is already sorted in ascending order by the left x position Li.
The output list must be sorted by the x position.
There must be no consecutive horizontal lines of equal height in the output skyline. For instance, [...[2 3], [4 5], [7 5], [11 5], [12 7]...] is not acceptable; the three lines of height 5 should be merged into one in the final output as such: [...[2 3], [4 5], [12 7], ...] */

/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
const findFirstGE = (arr, h) => {
    let l = 0, r = arr.length - 1;
    while (l + 1 < r) {
        const mid = parseInt(l + (r - l) / 2, 10);
        if (arr[mid] >= h) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return arr[l] >= h ? l : (arr[r] >= h ? r : arr.length);
};
const insert = (arr, h) => {
    const p = findFirstGE(arr, h);
    arr.splice(p, 0, h);
};
const findEq = (arr, h) => {
    let l = 0; r = arr.length - 1;
    while (l < r) {
        const mid = parseInt(l + (r - l) / 2, 10);
        if (arr[mid] === h) return mid;
        else if (arr[mid] > h) r = mid - 1;
        else l = mid + 1;
    }
    return l;
};
const remove = (arr, h) => {
    const p = findEq(arr, h);
    arr.splice(p, 1);
};
//sweep line
var getSkyline = function(buildings) {
    const events = buildings.reduce((a, c) => a.concat([[c[0], 1, c[2]], [c[1], -1, c[2]]]), []).sort((e1, e2) => e1[0] - e2[0] || e2[1]*e2[2] - e1[1]*e1[2]);
    //create points (events) [x, type, height] to scan, Type: entering 1, leaving -1. sort by x first, then by type, entering first, then by height, 
    //if entering: greater height first, if leave less height first, so we can use type*height to compare, larger one come first.

    const bst = [], ans = [];
    for (let e of events) {
        if (e[1] === 1) {
            if (!bst.length || e[2] > bst[bst.length - 1]) ans.push([e[0], e[2]]); //use sorted array for data structure, log(n) to binary insert and find by value to remove. Not perfect, because splice take n time. But js native libuary doesn't has binary search tree (treeset/treemap) or hashed heap
            insert(bst, e[2]);
        } else {
            remove(bst, e[2]);
            if (bst.length && e[2] > bst[bst.length - 1]) ans.push([e[0], bst[bst.length - 1]]);
            else if (!bst.length) ans.push([e[0], 0]);
        }
    }
    return JSON.stringify(ans);//.map(a => a.join()).join('|');
};
console.log(getSkyline([[0,2,3],[2,5,3]]));//[[0,3],[5,0]]
console.log(getSkyline([ [2 ,9 ,10], [3 ,7 ,15], [5 ,12 ,12], [15 ,20 ,10], [19 ,24 ,8] ])); //[ [2 10], [3 15], [7 12], [12 0], [15 10], [20 8], [24, 0] ]
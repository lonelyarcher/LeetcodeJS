/* Implement a SnapshotArray that supports the following interface:

SnapshotArray(int length) initializes an array-like data structure with the given length.  Initially, each element equals 0.
void set(index, val) sets the element at the given index to be equal to val.
int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id
 

Example 1:

Input: ["SnapshotArray","set","snap","set","get"]
[[3],[0,5],[],[0,6],[0,0]]
Output: [null,null,0,null,5]
Explanation: 
SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
snapshotArr.set(0,5);  // Set array[0] = 5
snapshotArr.snap();  // Take a snapshot, return snap_id = 0
snapshotArr.set(0,6);
snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5
 

Constraints:

1 <= length <= 50000
At most 50000 calls will be made to set, snap, and get.
0 <= index < length
0 <= snap_id < (the total number of times we call snap())
0 <= val <= 10^9 */



//the key is to save the space, snapshot don't save the whole array but just keep a snapshot id
/**
 * @param {number} length
 */
/**
 * @param {number} length
 */
var SnapshotArray = function(length) {
    this.arr = [...Array(length)].map(() => [[-1, 0]]);
    this.id = 0;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function(index, val) {
    this.arr[index].push([this.id, val]);
    return null;
};

/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function() {
    this.id++;
    return this.id - 1;
};

/** 
 * @param {number} index 
 * @param {number} snap_id
 * @return {number}
 */
const findFloor = (arr, target) => {
    let l = 0, r = arr.length - 1;
    while (r - l > 1) {
        const mid = Math.floor((r + l) / 2);
        if (arr[mid] <= target) {
            l = mid;
        } else {
            r = mid - 1;
        }
    }
    return arr[r] <= target ? r : l;
};

SnapshotArray.prototype.get = function(index, snap_id) {
    const i = findFloor(this.arr[index].map(a => a[0]), snap_id);
    return this.arr[index][i][1];
};



var obj = new SnapshotArray(1);
console.log(obj.snap());
console.log(obj.snap());
console.log(obj.set(0,4));
console.log(obj.snap());

console.log(obj.get(0,1));
console.log(obj.set(0,12));
console.log(obj.get(0,1));
console.log(obj.snap());
console.log(obj.get(0,3));

//0,1,null,2,0,null,0,3,12]
console.log('-----------------');
var obj2 = new SnapshotArray(1);
console.log(obj2.set(0, 4));
console.log(obj2.set(0, 16));
console.log(obj2.set(0, 13));
console.log(obj2.snap());
console.log(obj2.get(0,0));
console.log(obj2.snap());


//["SnapshotArray","set","set","set","snap","get","snap"]
//[[1],[0,4],[0,16],[0,13],[],[0,0],[]]
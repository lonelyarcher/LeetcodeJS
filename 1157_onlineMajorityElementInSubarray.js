/* Implementing the class MajorityChecker, which has the following API:

MajorityChecker(int[] arr) constructs an instance of MajorityChecker with the given array arr;
int query(int left, int right, int threshold) has arguments such that:
0 <= left <= right < arr.length representing a subarray of arr;
2 * threshold > right - left + 1, ie. the threshold is always a strict majority of the length of the subarray
Each query(...) returns the element in arr[left], arr[left+1], ..., arr[right] that occurs at least threshold times, or -1 if no such element exists.

 


 

Constraints:

1 <= arr.length <= 20000
1 <= arr[i] <= 20000
For each query, 0 <= left <= right < len(arr)
For each query, 2 * threshold > right - left + 1
The number of queries is at most 10000 */

/**
 * @param {number[]} arr
 */
var MajorityChecker = function(arr) {
    this.cutoff = parseInt(Math.sqrt(arr.length) / 2, 10);
    //cutoff, set to if query size small than this cutoff, then just iterate the elements to find majority.
    //if query size large than cutoff, then try each element which frequency higher than cutoff, binary search on pre-calculated index array. value : [occupance idx...]
    //if the index between the lower bound (first great or equal than query left) and upper bound (last small or equal than query right) >= threshold, then return it.
    this.idxMap = arr.reduce((a, c, i) => {a[c] = a[c] || []; a[c].push(i); return a;}, {}); //pre-calculate index list map
    this.idxList = Object.keys(this.idxMap).filter(k => this.idxMap[k].length > this.cutoff).sort((k1, k2) => this.idxMap[k2].length - this.idxMap[k1].length);
    //pre-calculate the idxList which has higher occupancy than cutoff
    this.arr = arr;
};

/** 
 * @param {number} left 
 * @param {number} right 
 * @param {number} threshold
 * @return {number}
 */
MajorityChecker.prototype.query = function(left, right, threshold) {
    
    if (right - left + 1 < 2 * this.cutoff) { //if small query size, no need to do binary search, directly iterate and count O(n) time.
       /*   Boyer–Moore majority vote algorithm, linear time to find majority and O(1) space, but it won't output the occupancy of majority.
       let count = 0, majority;
        for (let i = left; i <= right; i++) {
            if (i === 0) {
                majority = this.arr[i];
                count = 1;
            }
            else if (this.arr[i] === majority) count++;
            else count--;
        } */
        let count = {}, maxOccu = 0, majority;
        for (let i = left; i <= right; i++) {
            count[this.arr[i]] = count[this.arr[i]] || 0;
            if (++count[this.arr[i]] > maxOccu) {
                maxOccu = count[this.arr[i]];
                majority = this.arr[i];
            }
        }
        return maxOccu >= threshold ? majority : -1;
    } else { //if large query size, then try all the candidate (usually not too much, most likely very few)
        for (let i = 0; i < this.idxList.length; i++) {
            const list = this.idxMap[this.idxList[i]];
            const l = findFirstGE(list, left); //binary search for lower bound
            const r = findLastLE(list, right); //binary search for upper bound
            if (r - l + 1 >= threshold) return  this.idxList[i];
        }
        return -1;
    }
};

const findFirstGE = (arr, target) => {
    let l = 0; r = arr.length - 1;
    while (l + 1 < r) {
        const mid = parseInt(l + (r - l) / 2); //don't forget take integer by parseInt for javascript, python //, java, c++ is fine as type is integer.
        if (arr[mid] >= target) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return arr[l] >= target ? l : (arr[r] >= target ? r : arr.length);
}

const findLastLE = (arr, target) => {
    let l = 0; r = arr.length - 1;
    while (l + 1 < r) {
        const mid = parseInt(l + (r - l) / 2);
        if (arr[mid] <= target) {
            l = mid;
        } else {
            r = mid - 1;
        }
    }
    return arr[r] <= target ? r : (arr[l] <= target ? l : -1);
}

const majorityChecker2 = new MajorityChecker([2,2,2,2,1,2,2,1,1,1,2,1,2,1,2,2]);
console.log(majorityChecker2.query(3,5,2)); //2
const majorityChecker = new MajorityChecker([1,1,2,2,1,1]);
console.log(majorityChecker.query(0,5,4)); // returns 1
console.log(majorityChecker.query(0,3,3)); // returns -1
console.log(majorityChecker.query(2,3,2)); // returns 2

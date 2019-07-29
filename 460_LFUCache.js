/* Design and implement a data structure for Least Frequently Used (LFU) cache. It should support the following operations: get and put.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least frequently used item before inserting a new item. For the purpose of this problem, when there is a tie (i.e., two or more keys that have the same frequency), the least recently used key would be evicted.

Follow up:
Could you do both operations in O(1) time complexity?

*/

/**
 * @param {number} capacity
 */
var LFUCache = function(capacity) {
    this.freq = {};
    this.cache = {};
    this.keys = {};
    this.minF = 0;
    this.capacity = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
    if (!this.cache.hasOwnProperty(key) || this.capacity === 0) return -1;
    this.freq[key] = this.freq[key] + 1;
    this.keys[this.freq[key] - 1].delete(key);
    if (this.keys[this.freq[key] - 1].size === 0 && this.freq[key] - 1 === this.minF) {
        delete this.keys[this.minF];
        this.minF++;
    }
    this.keys[this.freq[key]] = this.keys[this.freq[key]] || new Set();
    this.keys[this.freq[key]].add(key);
    return this.cache[key];
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
    if (this.capacity === 0) return;
    if (!this.cache.hasOwnProperty(key)) {
        if (Object.keys(this.cache).length >= this.capacity) {
            const removeKey = this.keys[this.minF].values().next().value;
            this.keys[this.minF].delete(removeKey);
            delete this.cache[removeKey];
            delete this.freq[removeKey];
        }
        this.minF = 1;
        this.freq[key] = 1;
        this.keys[1] = this.keys[1] || new Set();
        this.keys[1].add(key);
    } else {
        this.get(key);
    }
    this.cache[key] = value;
};

/** 
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */



const cache = new LFUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // returns 1
cache.put(3, 3);    // evicts key 2
console.log(cache.get(2));       // returns -1 (not found)
console.log(cache.get(3));       // returns 3.
cache.put(4, 4);    // evicts key 1.
console.log(cache.get(1));       // returns -1 (not found)
console.log(cache.get(3));       // returns 3
console.log(cache.get(4));       // returns 4 */

const cache2 = new LFUCache( 2 /* capacity */ );

cache2.put(2, 1);
cache2.put(1, 1);
cache2.put(2, 3);
cache2.put(4, 1);
console.log(cache2.get(1));       // returns -1
console.log(cache2.get(2));       // returns 3


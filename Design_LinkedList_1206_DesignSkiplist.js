/* Design a Skiplist without using any built-in libraries.

A Skiplist is a data structure that takes O(log(n)) time to add, erase and search. Comparing with treap and red-black tree which has the same function and performance, the code length of Skiplist can be comparatively short and the idea behind Skiplists are just simple linked lists.

For example: we have a Skiplist containing [30,40,50,60,70,90] and we want to add 80 and 45 into it. The Skiplist works this way:


Artyom Kalinin [CC BY-SA 3.0], via Wikimedia Commons

You can see there are many layers in the Skiplist. Each layer is a sorted linked list. With the help of the top layers, add , erase and search can be faster than O(n). It can be proven that the average time complexity for each operation is O(log(n)) and space complexity is O(n).

To be specific, your design should include these functions:

bool search(int target) : Return whether the target exists in the Skiplist or not.
void add(int num): Insert a value into the SkipList. 
bool erase(int num): Remove a value in the Skiplist. If num does not exist in the Skiplist, do nothing and return false. If there exists multiple num values, removing any one of them is fine.
See more about Skiplist : https://en.wikipedia.org/wiki/Skip_list

Note that duplicates may exist in the Skiplist, your code needs to handle this situation.

 

Example:

Skiplist skiplist = new Skiplist();

skiplist.add(1);
skiplist.add(2);
skiplist.add(3);
skiplist.search(0);   // return false.
skiplist.add(4);
skiplist.search(1);   // return true.
skiplist.erase(0);    // return false, 0 is not in skiplist.
skiplist.erase(1);    // return true.
skiplist.search(1);   // return false, 1 has already been erased.
 

Constraints:

0 <= num, target <= 20000
At most 50000 calls will be made to search, add, and erase. */

/* Before solve this problem, better to read https://www.geeksforgeeks.org/skip-list/
For the one who has no idea about skip-list like me, it need you more time to understand its structure and some detail first.
Better use less pointers in Node structrue. If you have more pointers like double linked, left, right, up, down. You need to maintain all of them in you code when add and erase, which will increase difficulty of your coding.

Another trick is when search for value, you can keep a list of pre node for all levels, this list will help you a lot when you add and erase, whichi I implements in my iter().

To decide how many levels a value can reach, you can use one function, decideLevels(), then just loop it. For-Loop is always simplier than while loop or recursion. */

const decideLevels = (max) => {//to decide how many level will this value go up, I use p = 50%
    let ans = 1;
    while (Math.random() > 0.5 && ans < max) ans++;
    return ans;
};

const Node = function(val) {
    this.val = val;
    this.next = null;
    this.down = null;
};

var Skiplist = function() {
    this.maxLvl = ~~Math.log2(20000); //max levels decided by your input range.
    this.levels = [...Array(this.maxLvl)].map(() => new Node(-1));//this will save all the begin node in each level
    for (let i = this.maxLvl - 1; i > 0; i--) {
        this.levels[i].down = this.levels[i - 1];
    }
    this.head = this.levels[this.maxLvl - 1];
};

/** 
 * @param {number} target
 * @return {boolean}
 */
Skiplist.prototype.search = function(target) {
    const pre = this.iter(target);
    const ans = !pre[0].next ? false : pre[0].next.val === target;
    console.log(`searth ${target}: ${ans}`);
    return ans;
};

Skiplist.prototype.iter = function(target) {
    let cur = this.head;
    const pre = [];
    for (let i = this.maxLvl - 1; i >= 0; i--) {
        while (cur.next && cur.next.val < target) cur = cur.next;
        pre[i] = cur;
        cur = cur.down;
    }
    return pre;
}

/** 
 * @param {number} num
 * @return {void}
 */
const defineLevel = (max) => {
    let ans = 1;
    while (Math.random() > 0.5 && ans < max) ans++;
    return ans;
};

Skiplist.prototype.add = function(num) {
    const pre = this.iter(num);
    const lvs = decideLevels(this.maxLvl);
    for (let i = 0; i < lvs; i++) {
        const next = pre[i].next;
        pre[i].next = new Node(num);
        pre[i].next.next = next;
        if (i > 0) pre[i].next.down = pre[i - 1].next;
    }
    this.display();
};

/** 
 * @param {number} num
 * @return {boolean}
 */
Skiplist.prototype.erase = function(num) {
    const pre = this.iter(num);
    let ret;
    if (!pre[0].next || pre[0].next.val !== num) {
        ret = false;
    } else {
        for (let i = this.maxLvl - 1; i >= 0; i--) {
            if (pre[i].next && pre[i].next.val === num) {
                const toBeDeleted = pre[i].next;
                pre[i].next = toBeDeleted.next;
                toBeDeleted.next = null;//not necessary, but better to clean the unused links
                toBeDeleted.down = null;
            }
        }
        ret = true;
    }
    console.log(`erase ${num}: ${ret}`)
    this.display();
    return ret;
};

Skiplist.prototype.display = function() {
    const arr = [...Array(this.maxLvl)].map(() => []);
    for (let i = this.maxLvl - 1; i >= 0; i--) {
        let p = this.levels[i];
        while(p) {
            arr[i].push(p.val);
            p = p.next;
        }
    }
    console.log(arr.map(a => `[${a.join()}]`).join());
}

/** 
 * Your Skiplist object will be instantiated and called as such:
 * var obj = new Skiplist()
 * var param_1 = obj.search(target)
 * obj.add(num)
 * var param_3 = obj.erase(num)
 */

 const skiplist = new Skiplist();

 skiplist.add(1);
 skiplist.add(2);
 skiplist.add(3);
 skiplist.search(0);   // return false.
 skiplist.add(4);
 skiplist.search(1);   // return true.
 skiplist.erase(0);    // return false, 0 is not in skiplist.
 skiplist.erase(1);    // return true.
 skiplist.search(1);   // return false, 1 has already been erased.
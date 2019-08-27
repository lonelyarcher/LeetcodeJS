/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeZeroSumSublists = function(head) {
    const fakeNode = { next: head };
    const map = { 0: fakeNode };
    let p = head, preSum = 0;
    while (p != null) {
        preSum += p.val;
        if (map[preSum]) {
            let q = map[preSum].next;
            while (q !== p.next) {
                preSum += q.val;
                if (q !== p) delete map[preSum];
                q = q.next;
            }
            map[preSum].next = p.next;
        } else {
            map[preSum] = p;
        }
        p = p.next;
    }
    return fakeNode.next;
};


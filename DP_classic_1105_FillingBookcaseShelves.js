/* We have a sequence of books: the i-th book has thickness books[i][0] and height books[i][1].

We want to place these books in order onto bookcase shelves that have total width shelf_width.

We choose some of the books to place on this shelf (such that the sum of their thickness is <= shelf_width), 
then build another level of shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down.  
We repeat this process until there are no more books to place.

Note again that at each step of the above process, the order of the books we place is the same order as the given sequence of books.  
For example, if we have an ordered list of 5 books, we might place the first and second book onto the first shelf, 
the third book on the second shelf, and the fourth and fifth book on the last shelf.

Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.

 

Example 1:


Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelf_width = 4
Output: 6
Explanation:
The sum of the heights of the 3 shelves are 1 + 3 + 2 = 6.
Notice that book number 2 does not have to be on the first shelf.
 

Constraints:

1 <= books.length <= 1000
1 <= books[i][0] <= shelf_width <= 1000
1 <= books[i][1] <= 1000 */

/**
 * @param {number[][]} books
 * @param {number} shelf_width
 * @return {number}
 */
//sub(i): if sum of width 0 to i < shelf, return max(height 0 to i)
//if more than one shelf width, then take 1 to k books from right which can be placed in one shelf
//sub(i) = min(sub(i - k) + maxHeight of k books)
//O(n^2)
var minHeightShelves = function(books, shelf_width) {
    const m = Array(books.length + 1).fill(Infinity);
    const preW = books.reduce((a, c) => {a.push(a[a.length - 1] + c[0]); return a;}, [0]);
    const preH = books.reduce((a, c) => {a.push(Math.max(a[a.length - 1], c[1])); return a;}, [0]);
    const sub = i => {
        if (preW[i] <= shelf_width) return preH[i];
        if (m[i] !== Infinity) return m[i];
        let wr = 0, hr = 0;
        for (let j = i; j > 0 && wr + books[j - 1][0] <= shelf_width; j--) {
            wr += books[j - 1][0];
            hr = Math.max(hr, books[j - 1][1]);
            m[i] = Math.min(m[i], sub(j - 1) + hr);
        }
        return m[i];
    };
    return sub(books.length);
};

console.log(minHeightShelves([[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], 4)); //6
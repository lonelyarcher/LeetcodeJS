/* Given a file and assume that you can only read the file using a given method read4, implement a method to read n characters.

 

Method read4:

The API read4 reads 4 consecutive characters from the file, then writes those characters into the buffer array buf.

The return value is the number of actual characters read.

Note that read4() has its own file pointer, much like FILE *fp in C.

Definition of read4:

    Parameter:  char[] buf
    Returns:    int

Note: buf[] is destination not source, the results from read4 will be copied to buf[]
Below is a high level example of how read4 works:

File file("abcdefghijk"); // File is "abcdefghijk", initially file pointer (fp) points to 'a'
char[] buf = new char[4]; // Create buffer with enough space to store characters
read4(buf); // read4 returns 4. Now buf = "abcd", fp points to 'e'
read4(buf); // read4 returns 4. Now buf = "efgh", fp points to 'i'
read4(buf); // read4 returns 3. Now buf = "ijk", fp points to end of file
 

Method read:

By using the read4 method, implement the method read that reads n characters from the file and store it in the buffer array buf. Consider that you cannot manipulate the file directly.

The return value is the number of actual characters read.

Definition of read:

    Parameters:	char[] buf, int n
    Returns:	int

Note: buf[] is destination not source, you will need to write the results to buf[]
 

Example 1:

Input: file = "abc", n = 4
Output: 3
Explanation: After calling your read method, buf should contain "abc". We read a total of 3 characters from the file, so return 3. Note that "abc" is the file's content, not buf. buf is the destination buffer that you will have to write the results to.
Example 2:

Input: file = "abcde", n = 5
Output: 5
Explanation: After calling your read method, buf should contain "abcde". We read a total of 5 characters from the file, so return 5.
Example 3:

Input: file = "abcdABCD1234", n = 12
Output: 12
Explanation: After calling your read method, buf should contain "abcdABCD1234". We read a total of 12 characters from the file, so return 12.
Example 4:

Input: file = "leetcode", n = 5
Output: 5
Explanation: After calling your read method, buf should contain "leetc". We read a total of 5 characters from the file, so return 5.
 

Note:

Consider that you cannot manipulate the file directly, the file is only accesible for read4 but not for read.
The read function will only be called once for each test case.
You may assume the destination buffer array, buf, is guaranteed to have enough space for storing n characters. */

/**
 * Definition for read4()
 * 
 * @param {character[]} buf Destination buffer
 * @return {number} The number of actual characters read
 * read4 = function(buf) {
 *     ...
 * };
 */

/**
 * @param {function} read4() 
 * @return {function}
 */
//Difficulty is to understand the question, no directly access file which means you can only call read4, 
//which save the read chars in the function argument buf.
//so we need to call read4 multiple times and combine the each buf into the target buf, and return the acutally read length.
//CASE 1: because the n may not exactly times fo 4, so we will get the overflow in read4 buf, which we need to handle it as one corner case. 
//CASE 2: another corn case is that, the file may ends before n character, so we may meet the read4 return less than 4 before reach target n
//combine those two corner case, so each read4 call, we get the return len, we will take the Math.min(len (case 1), n - buf.length (case 2)) into the buf.
//if read to the end of file, the new read4 will return less than 4, then we stop it and return.


var solution = function(read4) {
    /**
     * @param {character[]} buf Destination buffer
     * @param {number} n Number of characters to read
     * @return {number} The number of actual characters read
     */
    return function(buf, n) { 
        while (buf.length < n)  { 
            const cur = []; //argument which will hold the read chars
            const len = read4(cur);
            buf.push(...cur.slice(0, Math.min(len, n - buf.length))); //check if we reach the target n or not (case 2), or return len is less than 4, Case 1
            if (len < 4) return buf.length; //end of file, return
        }
        return buf.length; 
    };
}

var solutionMultiple = function(read4) { 
    /**
     * Enhancement for being call multiple times
     * We need a array [left] to save the unread part from last read if read4 read more than target N
     * case 1: so first we read from left, if left has more than we need, then no need continue, 
     * Case 2: when we call read4, if read4 give us more than we need, we need to save it to left,  
     * Case 3: if read4 read all we need,  we continue calling.
     * Case 4: if read4 give us less than 4, which means it meets file end, we need to stop and return current length;
     */

    const left = [];
    function readMulti(buf, n) {
        buf.push(...left.splice(0, Math.min(n, left.length))); //left may has more than new read N
        if (n <= left.length) return n; //Case 1
        while(buf.length < n) {
            const buf4 = [];
            const len = read4(buf4);
            if (n - buf.length < len) { //Case 2
                buf.push(...buf4.splice(0, n - buf.length)); //take what we need for n - buff.length
                left.push(...buf4);//save the left to left
                return n;
            } else { //Case 3, read4 is not overflow target N
                buf.push(...buf4); //take all to buf
                if (len < 4) return buf.length;//Case 4, meets the file ends, stop and return the current length
            }
        }
    };
    return readMulti;
};
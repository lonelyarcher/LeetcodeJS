/* 题目大意：给你一些互质数字，求出它们组成的分数中第K小的分数。

A sorted list A contains 1, plus some number of primes.  Then, for every p < q in the list, we consider the fraction p/q.

What is the K-th smallest fraction considered?  Return your answer as an array of ints, where answer[0] = p and answer[1] = q.

1
2
3
4
5
6
7
8
9
10
Examples:
Input: A = [1, 2, 3, 5], K = 3
Output: [2, 5]
Explanation:
The fractions to be considered in sorted order are:
1/5, 1/3, 2/5, 1/2, 3/5, 2/3.
The third fraction is 2/5.
 
Input: A = [1, 7], K = 1
Output: [1, 7]
Note:

A will have length between 2 and 2000.
Each A[i] will be between 1 and 30000.
K will be between 1 and A.length * (A.length + 1) / 2. */

//binary search to try possible value, find all the fractions less than value, if rank (the number of fractions) === K, then return the maximum value in those fractions
//use virtual matrix to find all the fractions < possible value
//O(log(max)n)

class Solution {
    public int[] kthSmallestPrimeFraction(int[] A, int K) {
    final int n = A.length;
    double l = 0;
    double r = 1.0;    
    while (l < r) {
      double m = (l + r) / 2;
      double max_f = 0.0;
      int total = 0;
      int p = 0;
      int q = 0;
      for (int i = 0, j = 1; i < n - 1; ++i) {
        while (j < n && A[i] > m * A[j]) ++j;
        if (n == j) break;
        total += (n - j);
        final double f = (double)A[i] / A[j];
        if (f > max_f) {
          p = i;
          q = j;
          max_f = f;
        }
      }
      if (total == K)
        return new int[]{A[p], A[q]};
      else if (total > K)
        r = m;
      else
        l = m;
    }
    return new int[] {};
    }
  }
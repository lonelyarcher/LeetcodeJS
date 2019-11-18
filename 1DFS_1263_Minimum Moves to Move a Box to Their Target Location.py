""" Storekeeper is a game, in which the player pushes boxes around in a warehouse, trying to get them to target locations.

The game is represented by a grid of size n*m, where each element is a wall, floor or a box.

Your task is move the box 'B' to the target position 'T' under the following rules:

Player is represented by character 'S' and can move up, down, left, right in the grid if its a floor (empy cell).
Floor is represented by character '.' that means free cell to walk.
Wall is represented by character '#' that means obstacle  (impossible to walk there). 
There is only one box 'B' and one target cell 'T' in the grid.
The box can be moved to an adjacent free cell by standing next to the box and then moving in the direction of the box. This is a push.
The player cannot walk through the box.
Return the minimum number of pushes to move the box to the target. If there is no way to reach the target, return -1.

 

Example 1:



Input: grid = [["#","#","#","#","#","#"],
               ["#","T","#","#","#","#"],
               ["#",".",".","B",".","#"],
               ["#",".","#","#",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
Output: 3
Explanation: We return only the number of times the box is pushed.
Example 2:

Input: grid = [["#","#","#","#","#","#"],
               ["#","T","#","#","#","#"],
               ["#",".",".","B",".","#"],
               ["#","#","#","#",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
Output: -1
Example 3:

Input: grid = [["#","#","#","#","#","#"],
               ["#","T",".",".","#","#"],
               ["#",".","#","B",".","#"],
               ["#",".",".",".",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
Output: 5
Explanation:  push the box down, left, left, up and up.
Example 4:

Input: grid = [["#","#","#","#","#","#","#"],
               ["#","S","#",".","B","T","#"],
               ["#","#","#","#","#","#","#"]]
Output: -1
 

Constraints:

1 <= grid.length <= 20
1 <= grid[i].length <= 20
grid contains only characters '.', '#',  'S' , 'T', or 'B'.
There is only one character 'S', 'B' and 'T' in the grid. """

"""
box's position is major state: i, j, 
then where the box can go, should be ni, nj which is valid, and it opposite pos oi, oj is accessible to person S
each time, we dfs s to find out a set of pos it can reach
"""

class Solution:
    def minPushBox(self, grid: List[List[str]]) -> int:
        m, n = len(grid), len(grid[0])
        dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
        seen = set()
        moved = set()
        def valid(i, j):
            return i >= 0 and i < m and j >= 0 and j < n and grid[i][j] in '.T'
        def dfs(i, j):
            seen.add((i, j))
            for d in dir:
                ni, nj = i + d[0], j + d[1]
                if valid(ni, nj) and (ni, nj) not in seen:
                    dfs(ni, nj);
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 'S': si, sj = i, j
                elif grid[i][j] == 'B': bi, bj = i, j
                elif grid[i][j] == 'T': ti, tj = i, j
        def move(i, j):
            moved.add((i, j))
            seen = set()
            dfs(si, sj)
            for d in dir: 
                oi, oj = i - d[0], j - d[1]
                ni, nj = i + d[0], j + d[1]
                if valid(oi, oj) and (oi, oj) in seen and valid(ni, nj) and (ni, nj) not in moved:
                    si, sj = oi, oj
                    move(ni, nj)






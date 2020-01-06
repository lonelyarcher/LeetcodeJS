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
box's position is major state: (i, j), important: use tuple is much fast than two arguments 
then where the box can go, should be ni, nj which is valid, and it opposite pos oi, oj is accessible to person S
we can save state as (box, person)
each time, we dfs s to find out a set of pos the person can reach, and do standard BFS on state until the box == target
"""
from typing import List
import collections
class Solution: # BFS + BFS
    def minPushBox(self, grid: List[List[str]]) -> int:
        m, n = len(grid), len(grid[0])
        dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
        moved = set()
        def valid(p):
            return 0 <= p[0] < m and 0 <= p[1] < n and grid[p[0]][p[1]] != '#'
        def canReach(person, target, box):
            if person == target: return True
            seen = {person}
            queue = collections.deque([person])
            while queue:
                p = queue.popleft()
                for d in dir:
                    np = p[0] + d[0], p[1] + d[1]
                    if valid(np) and np != box and np not in seen:
                        if np == target: return True
                        seen.add(np)
                        queue.append(np)
            return False
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 'S': person = i, j
                elif grid[i][j] == 'B': box = i, j
                elif grid[i][j] == 'T': target = i, j
        queue = collections.deque([(box, person)])
        moved.add((box, person))
        step = 0
        while queue:
            for p in range(len(queue)):
                box, person = queue.popleft()
                if box == target: return step
                for d in dir: 
                    ob = box[0] - d[0], box[1] - d[1]
                    nb = box[0] + d[0], box[1] + d[1]
                    if valid(ob) and canReach(person, ob, box) and valid(nb) and (nb, ob) not in moved:
                        moved.add((nb, ob))
                        queue.append((nb, ob))
            step += 1
        return -1


class Solution2: #BFS + DFS
    def minPushBox(self, grid: List[List[str]]) -> int:
        m, n = len(grid), len(grid[0])
        dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
        moved = set()
        def valid(p):
            return 0 <= p[0] < m and 0 <= p[1] < n and grid[p[0]][p[1]] != '#'
        def dfs(p, seen, box):
            seen.add(p)
            for d in dir:
                np = p[0] + d[0], p[1] + d[1]
                if valid(np) and np != box and np not in seen:
                    dfs(np, seen, box)
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 'S': man = i, j
                elif grid[i][j] == 'B': box = i, j
                elif grid[i][j] == 'T': target = i, j
        queue = [(box, man)]
        moved.add((box, man))
        step = 0
        while (len(queue)):
            for p in range(len(queue)):
                box, man = queue.pop(0)
                if box == target: return step
                seen = set()
                dfs(man, seen, box)
                for d in dir: 
                    op = box[0] - d[0], box[1] - d[1]
                    np = box[0] + d[0], box[1] + d[1]
                    if valid(op) and op in seen and valid(np) and (np, op) not in moved:
                        moved.add((np, op))
                        queue.append((np, op))
            step += 1
        return -1

grid = [["#","#","#","#","#","#"],
        ["#","T","#","#","#","#"],
        ["#",".",".","B",".","#"],
        ["#",".","#","#",".","#"],
        ["#",".",".",".","S","#"],
        ["#","#","#","#","#","#"]]
print(Solution2().minPushBox(grid)) #3

grid = [["#","#","#","#","#","#"],
        ["#","T","#","#","#","#"],
        ["#",".",".","B",".","#"],
        ["#","#","#","#",".","#"],
        ["#",".",".",".","S","#"],
        ["#","#","#","#","#","#"]]
print(Solution2().minPushBox(grid)) #-1

grid = [["#","#","#","#","#","#"],
        ["#","T",".",".","#","#"],
        ["#",".","#","B",".","#"],
        ["#",".",".",".",".","#"],
        ["#",".",".",".","S","#"],
        ["#","#","#","#","#","#"]]
print(Solution2().minPushBox(grid)) #5       

grid = [["#","#","#","#","#","#","#"],
        ["#","S","#",".","B","T","#"],
        ["#","#","#","#","#","#","#"]]
print(Solution2().minPushBox(grid)) #-1
                        






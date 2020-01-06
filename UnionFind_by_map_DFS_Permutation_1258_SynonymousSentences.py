""" Given a list of pairs of equivalent words synonyms and a sentence text, Return all possible synonymous sentences sorted lexicographically.
 

Example 1:

Input:
synonyms = [["happy","joy"],["sad","sorrow"],["joy","cheerful"]],
text = "I am happy today but was sad yesterday"
Output:
["I am cheerful today but was sad yesterday",
​​​​​​​"I am cheerful today but was sorrow yesterday",
"I am happy today but was sad yesterday",
"I am happy today but was sorrow yesterday",
"I am joy today but was sad yesterday",
"I am joy today but was sorrow yesterday"]
 

Constraints:

0 <= synonyms.length <= 10
synonyms[i].length == 2
synonyms[0] != synonyms[1]
All words consist of at most 10 English letters only.
text is a single space separated sentence of at most 10 words. 


UnionFind, use dictionary {string : string} as parents array
to calculate connected components cc, word -> its parent -> the cc under this common ancestor 
DFS to find all the possible permutation of synonyms, sort to answer
"""
import collections
import itertools
from typing import List
class Solution:
    def generateSentences(self, synonyms: List[List[str]], text: str) -> List[str]:
        cc = collections.defaultdict(list)
        p = {w : w for w in set(itertools.chain(*synonyms))}
        def find(i):
            if p[i] != i: p[i] = find(p[i])
            return p[i]
        def union(i, j):
            p[find(i)] = find(j)
        for [a, b] in synonyms: union(a, b)
        for k, v in p.items():
            cc[find(v)].append(k)
        ans = []
        arr = text.split(" ")
        def dfs(i, path):
            if i == len(arr): 
                ans.append(path[1:])
                return
            if arr[i] in p:
                for w in cc[find(arr[i])]:
                    dfs(i + 1, path + " " + w)
            else: dfs(i + 1, path + " " + arr[i])
        dfs(0, '')
        return sorted(ans)

synonyms = [["happy","joy"],["sad","sorrow"],["joy","cheerful"]]
text = "I am happy today but was sad yesterday"
for sentence in Solution().generateSentences(synonyms, text):
    print(sentence)
"""
Output:
"I am cheerful today but was sad yesterday",
​​​​​​​"I am cheerful today but was sorrow yesterday",
"I am happy today but was sad yesterday",
"I am happy today but was sorrow yesterday",
"I am joy today but was sad yesterday",
"I am joy today but was sorrow yesterday"
"""
        


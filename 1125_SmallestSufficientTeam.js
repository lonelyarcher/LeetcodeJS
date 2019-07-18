/* In a project, you have a list of required skills req_skills, and a list of people.  The i-th person people[i] contains a list of skills that person has.

Consider a sufficient team: a set of people such that for every required skill in req_skills, there is at least one person in the team who has that skill.  We can represent these teams by the index of each person: for example, team = [0, 1, 3] represents the people with skills people[0], people[1], and people[3].

Return any sufficient team of the smallest possible size, represented by the index of each person.

You may return the answer in any order.  It is guaranteed an answer exists.

Constraints:

1 <= req_skills.length <= 16
1 <= people.length <= 60
1 <= people[i].length, req_skills[i].length, people[i][j].length <= 16
Elements of req_skills and people[i] are (respectively) distinct.
req_skills[i][j], people[i][j][k] are lowercase English letters.
It is guaranteed a sufficient team exists. */

/**
 * @param {string[]} req_skills
 * @param {string[][]} people
 * @return {number[]}
 */
//dfs
var smallestSufficientTeam_DFS = function(req_skills, people) {
    const map = req_skills.reduce((a, c, i) => { a[c] = 1 << i; return a; }, {});
    const req = (1 << req_skills.length) - 1; // '<<' precedence after '+-', &^| more lower, but !~ higher than */ 
    const pskills = people.map(person => person.reduce((a, c) => a|map[c], 0));
    let sft = people.map((p, i) => i);
    const dfs = (cur, team) => { //dfs need path/cur (may be mutilple),  to record search result, once it satified, then make copy of it to answer.
        //sometime needs visited to record visited elements, which will be backtracked later.
        if (team.length >= sft.length) return;
        if (cur === req) {
            sft = team.slice();  //DFS with backtracking, when result come out, must make copy otherwise it will changed after backtracking
            return;
        }
        pskills.forEach((p, i) => {
            if ((cur | p) > cur) {
                team.push(i);
                dfs(cur|p, team);
                team.pop();  //backtracking
            }
        }); 
    };
    dfs(0, []);
    return sft;
};

//bfs
// var smallestSufficientTeam = function(req_skills, people) {
    
// };

//dp with status compression (by bit operation to an integer)
var smallestSufficientTeam_DP = function(req_skills, people) {
    const req = 1 << req_skills.length;
    const map = req_skills.reduce((a, c, i) => { a[c] = 1 << i; return a; }, {});
    const p = people.map(person => person.reduce((a, c) => a|map[c], 0));
    const dp = [...Array(req)].map(r => Array(p.length + 1).fill(undefined));
    dp[0] = Array(p.length + 1).fill([]); 
    for (let i = 1; i < req; i++) {
        for (let j = 1; j <= people.length; j++) {
            const noPick = dp[i][j - 1] ? dp[i][j - 1].length : Infinity;
            const ni = i ^ (i & p[j - 1]);
            const pick = dp[ni][j - 1] ? dp[ni][j - 1].length + 1: Infinity;
            dp[i][j] = noPick <= pick ? dp[i][j - 1] : dp[ni][j - 1].concat([j - 1]);
        }
    }
    return dp[req - 1][p.length];
};



 

let req_skills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["nodejs","reactjs"]];
console.log(smallestSufficientTeam(req_skills, people));
//Output: [0,2]


req_skills = ["algorithms","math","java","reactjs","csharp","aws"], people = [["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]];
console.log(smallestSufficientTeam(req_skills, people));
//Output: [1,2]
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

//dp
var smallestSufficientTeam = function(req_skills, people) {
    const req = 1 << req_skills.length;
    const map = req_skills.reduce((a, c, i) => a[c] = i, {});
    const p = people.map(person => person.reduce((a, c) => a|map[c], 0));
    for (let i = 0; i < req; i++) {
        
    }
};

//dfs
var smallestSufficientTeam = function(req_skills, people) {
    
};

//bfs
var smallestSufficientTeam = function(req_skills, people) {
    
};

 

let req_skills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["nodejs","reactjs"]];
console.log(smallestSufficientTeam(req_skills, people));
//Output: [0,2]


req_skills = ["algorithms","math","java","reactjs","csharp","aws"], people = [["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]];
console.log(smallestSufficientTeam(req_skills, people));
//Output: [1,2]
 

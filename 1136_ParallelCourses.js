/* There are N courses, labelled from 1 to N.

We are given relations[i] = [X, Y], representing a prerequisite relationship between course X and course Y: course X has to be studied before course Y.

In one semester you can study any number of courses as long as you have studied all the prerequisites for the course you are studying.

Return the minimum number of semesters needed to study all courses.  If there is no way to study all the courses, return -1.

1 <= N <= 5000
1 <= relations.length <= 5000
relations[i][0] != relations[i][1]
There are no repeated relations in the input. */

/**
 * @param {number} N
 * @param {number[][]} relations
 * @return {number}
 */
//Topological Sorting by indegrees reducing
var minimumSemesters = function(N, relations) {
    const courses = [...Array(N)].map((v, i) => i);
    const adj = courses.map(() => []), indegrees = courses.map(v => 0);
    relations.forEach(([c1, c2], i) => { 
        adj[c2 - 1] = adj[c2 - 1] || [];
        adj[c2 - 1].push(c1 - 1);
        indegrees[c1 - 1]++;
    });
    const queue = courses.filter(c => indegrees[c] === 0); //put all indegree == 0 node into queue
    let semester = 0; 
    //record how many semesters, in semester, you can take all zero indegree courses at the same time.
    while (queue.length) {  
        const n = queue.length;
        for (let i = 0; i < n; i++) { //loop all the current semester
            const c = queue.shift();
            adj[c] && adj[c].forEach(nc => {
                indegrees[nc]--;
                if (indegrees[nc] === 0) queue.push(nc); //add to next semester
            });
        }
        N -= n; //count down the finished courses
        semester++;
    }
    return N === 0 ? semester : -1; //if all courses are taken then return the semester number, otherwise -1
};

console.log(minimumSemesters(N = 3, relations = [[1,3],[2,3]])); //2


console.log(minimumSemesters(N = 3, relations = [[1,2],[2,3],[3,1]])); //-1

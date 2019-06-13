const longestCommonSubstring = (a, b) => {
    const m = [];
    let ans = 0;
    m[0] = Array(b.length + 1).fill(0);
    for (let i = 1; i <= a.length; i++) {
        m[i][0] = Array(b.length + 1).fill(0);
        for (let j = 1; j <= b.length; j++) {
            m[i][j] = a.charAt(i) === b.charAt(j) ? m[i - 1][j - 1] + 1 : 0;
            ans = Math.max(ans, m[i][j]);
        }
    }
    return ans;

}

console.info(longestCommonSubstring("aaabbcc", "eabbcd"))
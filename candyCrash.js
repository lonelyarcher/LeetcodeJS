const candyCrash_sequential = (s) => {
    const st = [];
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if (st.length > 1 && c === st[0] && c === st[1]) {
            st.shift();
            st.shift();
        } else {
            st.unshift(c);
        }
    }
    return st.reduce((a, c) => c + a);
}

//dfs
const memo = {};
const candyCrash = s => {
    let ans = s;
    if (memo[s]) return memo[s];
    let i = 0;
    while (i < s.length) {
        let j = i + 1;
        while (j < s.length && s.charAt(j) === s.charAt(i)) j++;
        if (j - i >= 3) {
            const ns = candyCrash(s.slice(0, i) + s.slice(j));
            if (ns.length < ans.length) ans = ns;
        }
        i = j;
    }
    memo[s] = ans;
    return ans;
}

console.info(candyCrash("aabccdddcbbaeeefffgh"));

console.info(candyCrash("aaaccca")); //the sequential solution will fail, if first crash 'ccc' -> 'aaaa' -> '', all clear. so it should consider dfs all possible ways.


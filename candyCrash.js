const candyCrash = (s) => {
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

console.info(candyCrash("aabccdddcbbaeeefffgh"));
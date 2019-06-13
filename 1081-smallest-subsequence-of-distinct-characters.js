/**
 * @param {string} text
 * @return {string}
 */
var smallestSubsequence = function(text) {
    const st = [], picked = {};
    let ans = '';
    const last = [...text].reduce((a, b, i) => Object.assign(a, {[b.charCodeAt(0) - 'a'.charCodeAt(0)]:  i}), {});
    for( let i = 0; i < text.length; i++) {
        const c = text.charCodeAt(i) - 'a'.charCodeAt(0);
        if (picked[c]) continue;
        while (st.length && c <= st[0] && i < last[st[0]]) {
            picked[st.shift()] = false;
        }
        st.unshift(c);
        picked[c] = true;
    }
    return st.reduce((a, b) => a = String.fromCharCode(b + 'a'.charCodeAt(0)) + a, '');
};
console.info("test:");
console.info(smallestSubsequence("cdadabcc")); //adbc
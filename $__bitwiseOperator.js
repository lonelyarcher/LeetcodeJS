console.log(1|undefined); //undefined with bit operation will be 0
console.log(1 + undefined);

//precedence:  () [].new ++-- !~typeof */%  +- >><< <> instanceof === & ^ | && || = yield , 

//count 1 bit in a binary number x
const countOne = x => {
    let ans = 0;
    while(x > 0) {
        ans += (x&1);
        x >>= 1;
    }
    return ans;
};
console.log(countOne(7)); //3
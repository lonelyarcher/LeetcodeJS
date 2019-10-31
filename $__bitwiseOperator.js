console.log(1|undefined); //undefined with bit operation will be 0
console.log(1 + undefined);



/*
Operator Precedence:  
1.()
2. [] . new function()
3. ++ -- 
4. ! ~ typeof delete
5. /%*  
6. +- 
7. >><< 
8. <> >= <= instanceof 
9. === == !==
10. &
11. ^ 
12  |
13  &&
14 ||
15 = yield , 

*/ 

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
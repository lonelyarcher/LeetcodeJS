for( var i = 0; i < 3; i++) {
    setTimeout(() => { console.log(i); } , 0);
}
console.log("after loop, var is function scope");

console.log("let with block scope")
for( let i = 0; i < 3; i++) {
    setTimeout(() => { console.log(i); } , 0);
}

console.log("wrap with a funciton to make it with block scope")
for( let i = 0; i < 3; i++) {
    (function(i) {
        setTimeout(() => { console.log(i); } , 0);
    })(i);
}
const p1 = () => new Promise((resolve, reject) => {
    setTimeout(() => { console.log('p1'); resolve('p1'); }, 1000);
});

const p2 = (pre) => new Promise((resolve, reject) => {
    setTimeout(() => { console.log(`${pre} + p2`); resolve(`${pre} + p2`); }, 1000);
});

p1().then(p2).then(r => console.log(`last is ${r}`));

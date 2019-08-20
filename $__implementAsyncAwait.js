const api1 = new Promise((resolve, reject) => {
    const data = { name: 'John' }
    setTimeout(() => { resolve(data); }, 1000);
});

function* generator() {
    try {  //try catch could not catch async error, but promise then() err to make the gen throw erro and catch here.
        const response = yield api1; //async call api1
        console.log(`Response: ${response}`); //await to get response. Without yield, you will get undefined. 
    } catch (err) {
        console.log(`Err: ${err}`);
    }
}

const iter = generator();

iter.next().value.then(
    res => iter.next(res.name), // pass the response data to next
    err => iter.throw(`Err: ${err}`) //throw the error in gen 
);


function runner(generator) {
    const iter = generator();
    const handleNext = (value) => {
        const next = iter.next(value);
        if (next.done) {
            return next.value;
        } else {
            return Promise.resolve(next.value).then(
                handleNext,
                err => Promise.resolve(iter.throw(`Err: ${err}`)).then(handleNext); //throw the error in gen 
            );
        }
    };
    
    return handleNext();
}

runner(generator);



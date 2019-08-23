
// arrow function in class need babel setting: transform-class-properties, 
//which make those arrow functions are properties of class 
//which the type is funciton.
class MyPromise {

    constructor(execFunc) {
        this.promiseChain = [];
        this.handleError = () => {};
        this.resolve = this.resolve.bind(this);//need binding, because it will pass to execFunc and being executed in other function
        this.reject = this.reject.bind(this);//binding this, so it will always has its 'this' point to promise object.
        setTimeout(() => {execFunc(this.resolve, this.reject);}, 0); //async by default, not block the main thread 
        // put the execFunc into 'event stack' from 'execution stack' run the promiseChain after run then(), 
        // which add the next callback into the chain.
    };

    resolve(data){ //read the chain, and run each cb with data chained as starting parameter.
        let nextResult = data;
        try {
            this.promiseChain.forEach(cb => { 
                //read each function in the chain, call with the data and pass the result to next function in this chain array
                nextResult = cb(nextResult);
            });
        } catch (err) { //if catch err, call the handleError
            this.handleError(err);
        }
    }

    reject(err) { //call handleError
        this.handleError(err);
    }

    
    catch(cb) {
        this.handleError = cb; //set the handleError function
        return this;
    };

    then(success callback cb1, failure callback cb2) { //then is add cb1 into the chain, and set cb2 to handleError
        this.promiseChain.push(cb);
        this.handleError = cb;
        return this;
    };
};

const fakeApi = () => {
    const user = {
        name: 'John',
        age: 20,
    }
    if (Math.random() > 0.1) {
        return {
            user,
            statusCode: 200,
        };
    } else {
        return err = {
            statusCode: 404,
            message: "Not found."
        }
    }
};

const apiCall = () => new MyPromise((resolve, reject) => {
    
        const response = fakeApi();
        if (response.statusCode !== 200) {
            reject(response);
        } else {
            resolve(response);
        }

});

apiCall().then(response => {
    console.log(`fetch the user ${response.user.name} successfully.`);
    return response.user;
}).then(user => {
    console.log(`the fetched user is ${user.age} year old.`);
}).catch(err => {console.log(err.message)});
console.log("while fetching...");
console.log("while fetching...");
console.log("while fetching...");
console.log("while fetching...");
console.log("while fetching...");
console.log("while fetching...");
console.log("while fetching...");

console.log("while fetching...");
console.log("while fetching...");
console.log("while fetching...");


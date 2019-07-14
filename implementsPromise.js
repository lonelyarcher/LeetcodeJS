

class MyPromise {

    constructor(execFunc) {
        this.promiseChain = [];
        this.handleError = () => {};
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        execFunc(this.resolve, this.reject);
    };

    resolve(data){
        const nextResult = data;
        try {
            this.promiseChain.forEach(cb => {
                nextResult = cb(nextResult);
            });
        } catch (err) {
            this.handleError(err);
        }
    }

    reject(err) {
        this.handleError(err);
    }

    
    catch(cb) {
        this.handleError = cb;
        return this;
    };

    then(cb) {
        this.promiseChain.push(cb);
        return this;
    };
};

const fakeApi = () => {
    const user = {
        name: 'John',
        age: 20,
    }
    if (Math.random() > 0.5) {
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

const apiCall = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        const response = fakeApi();
        if (response.statusCode !== 200) {
            reject(response);
        } else {
            resolve(response);
        }
    }, 3000);
});

apiCall().then(response => {
    console.log(`fetch the user ${response.user.name} successfully.`);
    return response.user;
}).then(user => {
    console.log(`the fetched user is ${user.age} year old.`);
}).catch(err => {console.log(err.message)});

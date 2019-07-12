
    this.name = "meng";
    const p = function() {
        const that = this;
        Array.prototype.toString = function() {
            return this.join("+");
        }
        console.log([1,2,3,4].toString());
        const f = function() {
            console.log(`${that.name}`);
        }
        f();
    }
    p.call(this);
    console.log([1,2,3,4].toString());

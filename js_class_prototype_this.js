
    this.name = "meng";
    const p = function() {
        const that = this;
        const f = function() {
            console.log(`${that.name}`);
        }
        f();
    }
    p.call(this);



const People = function(name) {
    this.name = name;
    this.getName = function() {
        return this.name;
    };
};
People.prototype.a = 1;
People.prototype.walk = function(){
    console.log(`${this.name} is Walking...`);
};


const Employee = function(name, company) {
    People.apply(this, [name]);
    this.company = company;
    this.getCompany = function () {
        return this.company;
    }
}

Employee.prototype = Object.create(People.prototype);
const a = new Employee('Tom', 'FB');

const Employer = function(name, asset){
    People.call(this, name);
    this.asset = asset;
    this.a = 2;
    this.getAsset = function() {
        console.log(this.asset);
        return this.asset;
    }
};
Employer.prototype = new People();
const b = new Employer("1M", '1billion');
b.name = 'Jerry';
b.company = 'Google';

Employer.prototype.a = 2;
console.log(a.getName());

b.walk();
b.getAsset();
console.log(People.prototype.a);
console.log(Employer.prototype.a);

const People = function(name) {
    this.name = name;
    this.getName = function() {
        return this.name;
    };
};
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

const Employer = function(asset){
    this.asset = asset;
};
Employer.prototype = new People();
const b = new Employer("1M");
//b.name = 'Jerry';
//b.company = 'Google';


console.log(a.getName());
a.walk();
b.walk();
function Person(firstName) {
    this.firstName = firstName;
}

Person.prototype.sayHello = function () {
    console.log("hello, fuck you!" + this.firstName);
};

var person1 = new Person('Alice');
var person2 = new Person('Bob');
var helloFunction = person1.sayHello;

person1.sayHello();
person2.sayHello();
helloFunction();

console.log(helloFunction === person2.sayHello);
console.log(helloFunction === Person.prototype.sayHello);
helloFunction.call(person1);
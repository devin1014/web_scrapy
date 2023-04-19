// const ProgressBar = require('progress')
//
// const bar = new ProgressBar(':bar', {total: 10})
// const timer = setInterval(() => {
//     bar.tick()
//     if (bar.complete) {
//         clearInterval(timer)
//     }
// }, 100)
//
// const chalk = require('chalk')
// console.log(chalk.red('你好'))
// console.log(chalk.yellow('你好'))
// console.log(chalk.blue('你好'))
// console.log(chalk.bgGreen.red('abc'))

function Person(firstName, lastName, age, action) {
    this.name = `${firstName} + ${lastName}`;
    this.age = age;
    this.action = action;
}

Person.prototype.go = function () {
    console.log('gogogo');
}

const person1 = new Person('a', 'b', '18', () => {
    console.log('666');
});

person1.action()
person1.go();

const { generatePassword } = require('./index');

console.log(generatePassword());
console.log(generatePassword(39));

console.log(generatePassword(true));
console.log(generatePassword(false));
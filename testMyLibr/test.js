const { generatePassword } = require('mylibrgenrandompass');

console.log(generatePassword());
console.log(generatePassword(39));

console.log(generatePassword(true));
console.log(generatePassword(false));
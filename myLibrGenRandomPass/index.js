const crypto = require('crypto');

/**
 * Генерирует случайный пароль с указанной длиной и типами символов.
 *
 * @param {number} [length=12] - Длина пароля.
 * @param {boolean} [useUppercase=true] - Использовать ли прописные буквы.
 * @param {boolean} [useLowercase=true] - Использовать ли строчные буквы.
 * @param {boolean} [useNumbers=true] - Использовать ли цифры.
 * @param {boolean} [useSymbols=true] - Использовать ли специальные символы.
 * @returns {string} Сгенерированный пароль.
 */
function generatePassword(
  length = 12,
  useUppercase = true,
  useLowercase = true,
  useNumbers = true,
  useSymbols = true
) {
  const uppercaseChars = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const lowercaseChars = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let availableChars = '';
  if (useUppercase) availableChars += uppercaseChars;
  if (useLowercase) availableChars += lowercaseChars;
  if (useNumbers) availableChars += numberChars;
  if (useSymbols) availableChars += symbolChars;

  if (availableChars.length === 0) {
    throw new Error('Вы должны включить как минимум один тип символов.');
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, availableChars.length);
    password += availableChars[randomIndex];
  }

  return password;
}

module.exports = { generatePassword };

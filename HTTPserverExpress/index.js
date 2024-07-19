const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Пути к файлам для хранения счетчиков просмотров
const indexCounterFilePath = path.join(__dirname, 'index_counter.json');
const aboutCounterFilePath = path.join(__dirname, 'about_counter.json');

/**
 * Загружает значение счетчика просмотров для указанной страницы.
 * @param {string} filePath - Путь к файлу для хранения счетчика.
 * @returns {number} Значение счетчика.
 */
function loadCounter(filePath) {
  try {
    const counterData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(counterData).count;
  } catch (err) {
    // Если файл не существует или не может быть прочитан, возвращаем 0
    return 0;
  }
}

/**
 * Увеличивает значение счетчика просмотров для указанной страницы на 1 и сохраняет его.
 * @param {string} filePath - Путь к файлу для хранения счетчика.
 */
function incrementCounter(filePath) {
  const count = loadCounter(filePath);
  const newCount = count + 1;
  saveCounter(filePath, newCount);
}

/**
 * Сохраняет значение счетчика просмотров для указанной страницы.
 * @param {string} filePath - Путь к файлу для хранения счетчика.
 * @param {number} count - Значение счетчика.
 */
function saveCounter(filePath, count) {
  fs.writeFileSync(filePath, JSON.stringify({ count }));
}

// Обработчик для главной страницы "/"
app.get('/', (req, res) => {
  incrementCounter(indexCounterFilePath);

  const count = loadCounter(indexCounterFilePath);
  res.send(`
    <h1>Главная страница</h1>
    <p>Вы посетили эту страницу ${count} раз(а).</p>
    <a href="/about">Перейти на страницу "О нас"</a>
  `);
});

// Обработчик для страницы "/about"
app.get('/about', (req, res) => {
  incrementCounter(aboutCounterFilePath);

  const count = loadCounter(aboutCounterFilePath);
  res.send(`
    <h1>Страница "О нас"</h1>
    <p>Вы посетили эту страницу ${count} раз(а).</p>
    <a href="/">Перейти на главную страницу</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

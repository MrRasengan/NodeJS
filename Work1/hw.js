const http = require('http');

// Счетчик просмотров для каждой страницы
const viewCounts = {
  '/': 0,
  '/about': 0
};

const server = http.createServer((req, res) => {
  // Проверяем URL запроса
  if (req.url === '/') {
    // Увеличиваем счетчик просмотров для главной страницы
    viewCounts['/']++;

    // Возвращаем главную страницу
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write(`
      <html>
        <head>
          <title>Главная</title>
        </head>
        <body>
          <h1>Добро пожаловать на главную страницу!</h1>
          <p>Количество просмотров: ${viewCounts['/']}</p>
          <p><a href="/about">Перейти на страницу "О нас"</a></p>
        </body>
      </html>
    `);
    res.end();
  } else if (req.url === '/about') {
    // Увеличиваем счетчик просмотров для страницы "О нас"
    viewCounts['/about']++;

    // Возвращаем страницу "О нас"
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write(`
      <html>
        <head>
          <title>О нас</title>
        </head>
        <body>
          <h1>Это страница "О нас"</h1>
          <p>Количество просмотров: ${viewCounts['/about']}</p>
          <p><a href="/">Перейти на главную страницу</a></p>
        </body>
      </html>
    `);
    res.end();
  } else {
    // Обработка несуществующих роутов (404)
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write(`
      <html>
        <head>
          <title>404 - Страница не найдена</title>
        </head>
        <body>
          <h1>404 - Страница не найдена</h1>
          <p>Запрошенный ресурс не может быть найден.</p>
        </body>
      </html>
    `);
    res.end();
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}/`);
});

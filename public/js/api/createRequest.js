/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = options => {
  const xhr = new XMLHttpRequest();

  try {
    // Устанавливаем метод запроса
    xhr.open(options.method || 'GET', options.url);

    // Устанавливаем тип ответа
    xhr.responseType = 'json';

    // Создаем объект FormData для передачи данных в случае POST запроса
    const formData = new FormData();

    // Перебираем данные из параметра options.data и добавляем их в FormData
    if (options.data) {
      for (const key in options.data) {
        formData.append(key, options.data[key]);
      }
    }

    // Обработчик события завершения запроса
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Запрос успешен
        options.callback(null, xhr.response);
      } else {
        // Ошибка в запросе
        options.callback(new Error(`Ошибка запроса с HTTP-статусом ${xhr.status}`), null);
      }
    };

    // Обработчик события ошибки запроса
    xhr.onerror = () => {
      options.callback(new Error('Ошибка сети: не удалось выполнить запрос'), null);
    };

    xhr.send(options.method === 'GET' ? null : formData);
  } catch (e) {
    // перехват сетевой ошибки
    options.callback(e, null);
  }
};


//   createRequest({
//     url: 'https://example.com',
//     data: {
//       email: 'ivan@poselok.ru',
//       password: 'odinodin'
//     },
//     method: 'GET',
//     callback: (err, response) => {
//       console.log('Ошибка, если есть', err);
//       console.log('Данные, если нет ошибки', response);
//     }
//   });
/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }


// const user = {
//   id: 12,
//   name: 'Vlad'
// };

// User.setCurrent(user);

// console.log(localStorage.user); // строка "{"id":12,"name":"Vlad"}"

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

// Пример использования:
// const user = {
//   id: 12,
//   name: 'Vlad'
// };

// User.setCurrent(user);
// let current = User.current();
// console.log(current); // объект { id: 12, name: 'Vlad' }

// User.unsetCurrent();

// current = User.current();
// console.log(current); // undefined

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const userData = localStorage.getItem('user');

    if (userData) {
      return JSON.parse(userData);
    } else {
      return undefined;
    }
  }
  // Пример использования:
// const user = {
//   id: 12,
//   name: 'Vlad'
// };

// User.setCurrent(user);
// const current = User.current();

// console.log(current); // объект { id: 12, name: 'Vlad' }


  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      callback: (err, response) => {
        if (response && response.success) {
          // Если пользователь авторизован, обновите данные текущего пользователя
          this.setCurrent(response.user);
        } else {
          // Если пользователь не авторизован, удалите данные об авторизации
          this.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }

//   console.log(User.current()); // undefined
// User.fetch((err, response) => {
//   console.log(response.user.name); // Vlad
//   console.log(User.current().name); // Vlad
// });

// // Пользователь больше не авторизован
// User.fetch((err, response) => {
//   console.log(response.success); // false
//   console.log(User.current()); // undefined
// });

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  // Пример использования:
// const loginData = {
//   email: 'test@test.ru',
//   password: 'abracadabra',
// };

// User.login(loginData, (err, response) => {
//   console.log(response);
// });

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success && response.user) {
          // Если регистрация прошла успешно, сохраните пользователя с помощью метода setCurrent
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  // Пример использования:
// const registrationData = {
//   name: 'Vlad',
//   email: 'test@test.ru',
//   password: 'abracadabra'
// };

// User.register(registrationData, (err, response) => {
//   console.log(response);
// });

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      callback: (err, response) => {
        if (response.success) {
          // Если выход прошел успешно, удалите информацию об авторизованном пользователе
          this.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }

  // User.logout((err, response) => {
  //   console.log(response);
  // });
}

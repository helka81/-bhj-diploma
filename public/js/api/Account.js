/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {

  static URL = '/account';
  /**
   * Получает информацию о счёте
   * */
  /**
   * Метод get отправляет GET запрос на сервер по заданному URL.
   * @param {number} id - Идентификатор записи.
   * @param {function} callback - Функция обратного вызова.
   */
  static get(id, callback) {
    createRequest({
      url: `${this.URL}/${id}`,
      method: 'GET',
      callback,
    });
  }
}


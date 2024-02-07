/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
    static URL = '/transaction';
}

// Вызов метода list унаследованного от Entity
// transaction.list({/* данные */}, (err, response) => {
//     // Обработка ответа или ошибки
//   });
  
//   // Вызов метода create унаследованного от Entity
//   transaction.create({/* данные */}, (err, response) => {
//     // Обработка ответа или ошибки
//   });
  
//   // Вызов метода remove унаследованного от Entity
//   transaction.remove({/* данные */}, (err, response) => {
//     // Обработка ответа или ошибки
//   });
  
//   // Вызов метода get унаследованного от Entity
//   transaction.get(123, (err, response) => {
//     // Обработка ответа или ошибки
//   });
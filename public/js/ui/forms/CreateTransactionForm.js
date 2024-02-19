/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const selectElement = this.element.querySelector('.accounts-select');

    Account.list({}, (err, response) => {
      if (err) {
        console.error('Ошибка при загрузке счетов:', err);
        return;
      }

      const accounts = response.data;

      // Очищаем список счетов перед добавлением новых
      selectElement.innerHTML = '';

      // Добавляем каждый счет в список
      accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = account.name;
        selectElement.appendChild(option);
      });
    });

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (err) {
        console.error('Ошибка создания транзакции:', err);
        return;
      }

      // Сбрасываем форму
      this.element.reset();

      // Закрываем всплывающее окно, содержащее форму
      const modalId = this.element.closest('.modal').dataset.modalId;
      const modal = App.getModal(modalId);
      modal.close();

      // Обновляем информацию о приложении
      App.update();
    });
  }
}

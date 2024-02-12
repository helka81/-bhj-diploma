
class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error('Переданный элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(this.element); // Создаем объект FormData из элемента формы
      this.submit(formData);
    });
  }

  getData(formData) {
    const entries = formData.entries();
    const data = {};

    for (let item of entries) {
      const key = item[0];
      const value = item[1];
      data[key] = value;
    }

    return data;
  }

  onSubmit(data) {
    // Пустой метод onSubmit, который будет переопределен в дочерних классах
  }

  submit(formData) {
    const data = this.getData(formData);
    this.onSubmit(data); 
  }
}
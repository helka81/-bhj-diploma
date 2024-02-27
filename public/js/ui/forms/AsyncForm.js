
// class AsyncForm {
//   constructor(element) {
//     if (!element) {
//       throw new Error('Переданный элемент не существует');
//     }
//     this.element = element;
//     this.registerEvents();
//   }

//   registerEvents() {
//     this.element.addEventListener('submit', (event) => {
//       event.preventDefault();
//       const formData = new FormData(this.element); // Создаем объект FormData из элемента формы
//       this.submit(formData);
//     });
//   }

//   getData(formData) {
//     const entries = formData.entries();
//     const data = {};

//     for (let item of entries) {
//       const key = item[0];
//       const value = item[1];
//       data[key] = value;
//     }

//     return data;
//     // const formData = new FormData(this.element);
//     // return Object.fromEntries(formData.entries());
//   }

//   onSubmit(data) {
//     // Пустой метод onSubmit, который будет переопределен в дочерних классах
//   }

//   submit(formData) {
//     const data = this.getData(formData);
//     this.onSubmit(data); 
//   }
// }

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

  getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
  }

  onSubmit(data) {
    // Пустой метод onSubmit, который будет переопределен в дочерних классах
  }

  submit(formData) {
    const data = this.getData();
    const { account_id } = data;
    const url = `http://localhost:8000/transaction?account_id=${account_id}`; // добавляем account_id к URL
    fetch(url, {
      method: 'GET',
      // другие параметры запроса
    })
      .then(response => {
        // обработка ответа
        console.log(response);
      })
      .catch(error => {
        // обработка ошибки
        console.error(error);
      });
  }
}


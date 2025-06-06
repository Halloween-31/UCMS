# UCMS: Content managment system with artificial intelligence

## Project description

**UCMS** - is a web application that uses modern artificial intelligence technologies to create, edit, and interact with web content.
This application allows you to easily and quickly create web pages and manipulate the data displayed. The built-in assistant allows you to
quickly generate HTML and CSS code from user requests. Modern artificial intelligence models are able to analyze the context of prompts,
understand user intentions, offer optimal solutions, and generate clean, semantically correct code based on simple instructions.
This makes it possible to simplify development, i.e. to remove the technological barrier for non-technical users and beginners;
to ensure a balance between ease of use and unlimited between ease of use and unlimited functional flexibility provided by artificial intelligence;
speed up the creation process; significantly reduce the cost of development; create a unique website rather than use a template approach to development.

The application provides a user interface using React and Vite, where users can:

* Register and log in;
* Create your own websites;
* Create pages on sites;
* Create document types that are the framework of pages;
* Generate HTML and CSS code with the help of an AI-based assistant;
* Generate content with the help of an assistant;
* View the pages they have created

The server side is implemented on ASP.NET Core 9.2 and contains 4 microservices:

* **FrontendReactVite** (user interface);
* **DataService** (service for interaction with the database);
* **AISerive** (service for interaction with AI);
* **WebFrontEnd** (service for dynamic page generation).

Data storage:

* **SQL Server** — relational database.

---

## Technology stack

* **Frontend:**

  * React
  * Vite
  * TypeScript

* **Backend:**

  * ASP.NET Core 9.0
  * .NET Aspire 9.2
  * EF Core

* **Datavase:**

  * SQL Server

* **Infrastructure and deployment:**

  * .NET Aspire (automatic settings)

---

## Requirements

1. **Operating system:**

   * Windows 10 / 11 (64-bit)
   * Linux (64-bit)


2. **Required software:**

   * [.NET SDK 9.0](https://dotnet.microsoft.com/download)
   * [Node.js](https://nodejs.org/) (LTS-version) and npm

---

## Launching the project

1. Open a terminal and go to the root directory of the project:

   ```bash
   cd /UCMS.AppHost
   ```

2. Execute the command:

   ```bash
   dotnet run
   ```

3. After a successful start, open the link you see in the terminal in your browser:

   ```
   https://localhost:*****
   ```

---

## Quick start: basic functions

* **Registration and login:**
  Open the application in a browser → “Sign Up” → enter email/password → “Sign Up”.

* **Create a site:**
  On the main page, you will see a list of all your sites, where you can create a new site by clicking on the “Create new site” button.

* **Create a document type:**
  To create a new document type, which is a page frame, go to the “Settings” tab and click “Add new setting” and fill in all the appropriate fields. After entering all the data, click “Save page”.

* **Adding a property:**
  To add a new document type property, click “Add new property”.

* **Create a new page:**
  After creating a document type, go to the “My Site” tab. To add a new page, click “Add new page”. Select which document type will be used to create the current page and click “Confirm”. Fill in all the fields and click “Save page”.

* **View the page code:**
  Go to the “Settings” tab, where you will find the properties of the document type on which this page was created. On the top control panel, go to the “Code” tab, where you can see the code of this document type.

* **Communicate with the assistant:**
  Click the chat icon in the lower left corner of the screen. After the chat opens, enter a request to the AI system and click “Send”. The request is sent to the AI, which will generate a page code based on the request. After receiving a response, click Apply to apply the code to the document type and page. After the code is displayed in the corresponding window, click “Save page”.

* **Previewing the page:**
  Now the page properties and code are saved. In the control panel, click the “View” button to go to the generated page.

---

## Debugging and diagnostics

* If you encounter any errors when launching the app, open the Aspire Dashboard, review the logs, and look for error messages.

* Check if SQL Server is working

* If the frontend does not start:

  1. Check the versions of Node.js and npm:

     ```bash
     node --version
     npm --version
     ```
  2. Delete directory `src/UCMS.FrontendReactVite/node_modules` and execute:

     ```bash
     npm install
     npm run dev
     ```

---



# UCMS: Система керування вмістом з використанням штучного інтелекту

## Опис проєкту

**UCMS** - це вебзастосунок, що використовує сучасні технології штучного інтелекту для створення, редагування та взаємодією з вебконтентом.
Даний застосунок дозволяє легко та швидко створювати вебсторінки та маніпулювати даними, що відображаються. Вбудований асистент дозволяє
швидко генерувати HTML та CSS код із запитів користувача. Сучасні моделі штучного інтелекту здатні аналізувати контекст запитів,
розуміти наміри користувача, пропонувати оптимальні рішення та генерувати чистий, семантично правильний код на основі простих інструкцій.
Це дозволяє спростити розробку, тобто усунути технологічний бар’єр для нетехнічних користувачів та початківців; забезпечити балан
між простотою використання і необмеженою функціональною гнучкістю, що забезпечується штучний інтелект; прискорити процес створення;
суттєво знизити вартість розробки; створити унікальний вебсайт, а не використовувати шаблонний підхід до розробки.

Застосунок надає користувацький інтерфейс використовуючи React і Vite, де користувачі можуть:

* Реєструватися та авторизуватися;
* Створювати власні сайти;
* Створювати сторінки на сайтах;
* Створювати типи документів, що є каркасом сторінок;
* Генерувати HTML та CSS код за допомогою асистента на основі ШІ;
* Генерувати контент за допомогою асистента;
* Переглядати створені ними сторінки

Серверна частина реалізована на ASP.NET Core 9.2 та містить 4 мікросервіси:

* **FrontendReactVite** (користувацький інтерфейс);
* **DataService** (сервіс для взаємодії з базою даних);
* **AISerive** (сервіс для взаємодії з ШІ);
* **WebFrontEnd** (сервіс для динамічної генерації сторінок).

Зберігання даних:

* **SQL Server** — реляційна БД.

---

## Технологічний стек

* **Frontend:**

  * React
  * Vite
  * TypeScript

* **Backend:**

  * ASP.NET Core 9.0
  * .NET Aspire 9.2
  * EF Core

* **Бази даних:**

  * SQL Server

* **Інфраструктура й розгортання:**

  * .NET Aspire (автоматичні налаштування)

---

## Вимоги

1. **Операційна система:**

   * Windows 10 / 11 (64-bit)
   * Linux (64-bit)


2. **Необхідне програмне забезпечення:**

   * [.NET SDK 9.0](https://dotnet.microsoft.com/download)
   * [Node.js](https://nodejs.org/) (LTS-версія) і npm

---

## Запуск проєкту

1. Відкрийте термінал і перейдіть у кореневу директорію проекту:

   ```bash
   cd /UCMS.AppHost
   ```

2. Виконайте команду:

   ```bash
   dotnet run
   ```

3. Після успішного старту відкрийте у браузері посиланння, що побачите в терміналі:

   ```
   https://localhost:*****
   ```

---

## Швидкий старт: базові функції

* **Реєстрація та логін:**
  Відкрийте застосунок у браузері → "Sign Up" → вкажіть email/пароль → "Sign Up".

* **Створення сайту:**
  На головній сторінці буде список всіх ваших сайтів, де натиснушви на кнопку "Create new site" ви створите новий сайт.

* **Створення типу документу:**
  Для створення нового типу документа, що є каркасом сторінки перейдіть на вкладку "Settings" та натисніть "Add new setting" та заповніть всі відповідні поля. Після вводу всіх даних натисніть "Save page".

* **Додавання властивості:**
  Для додавання нової властивості типу документа натисніть "Add new property".

* **Створення нової сторінки:**
  Після створення типу документа перейдіть на вкладу "My Site". Для додавання нової сторінки натисніть "Add new page". Оберіть на основі якого типу документа буде створено поточну сторінку та натисніть "Confirm". Заповніть всі поля та натисніть "Save page".

* **Перегляд коду сторінки:**
  Перейдіть на вкладку "Settings", де буде властивості типу документу на основі якого створено дану сторінку. На верхній панелі керування перейдіть на вкладу "Code", де можна побачити код даного типу документу.

* **Взаємодія з асистентом на основі ШІ:**
  Натисніть на ікону чату в лівому нижньому куті екрану. Після відкриття чату введіть запит до системи ШІ та натисніть "Send". Запит відправлено ШІ, який на основі запиту згенерує код сторінки. Після отримання відповіді натисніть "Apply", щоб отриманий код був застосований до даного типу документа та сторінки. Після відображення коду у відповідному вікні натисніть "Save page".

* **Перегляд  сторінки:**
  Тепер властивості сторінки та код збережено. На панелі керування натисніть на кнопку "View", щоб перейти на згенеровану сторінку.

---

## Налагодження та діагностика

* Якщо при запуску застосунку виникли будь-які помилки, відкрийте Aspire Dashboard, перегляньте логи та знайдіть повідомлення про помилки.

* Перевірте чи працює SQL Server

* Якщо фронтенд не стартує:

  1. Перевірте версії Node.js та npm:

     ```bash
     node --version
     npm --version
     ```
  2. Видаліть теку `src/UCMS.FrontendReactVite/node_modules` та виконайте:

     ```bash
     npm install
     npm run dev
     ```

---
